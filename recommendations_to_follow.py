import requests
import json
from collections import defaultdict

from mastodon import MastodonClient
from database import Suggestion, Following

from rich import print
from rich.table import Table

from argparse import ArgumentParser

parser = ArgumentParser()
parser.add_argument("--update_own_followers", action="store_true", default=False)
args = parser.parse_args()

mc = MastodonClient()

if "access_token" not in mc.config:
    print("Please visit ", mc.get_url_for_code())
    code = input("Please enter code: ")
    mc.use_code(code)

account_id = mc.get_user()["id"]


def get_following(account_id, force_update=False):
    data, created = Following.get_or_create(account_id=account_id)

    if not created and not force_update:
        return data

    following = mc.get_following(account_id)
    data.data = json.dumps(following)
    data.save()

    return data


suggestions = defaultdict(int)

lookup = {}

following = json.loads(
    get_following(account_id, force_update=args.update_own_followers).data
)
following_ids = [x["id"] for x in following]

for acc_id in following_ids:
    dd = get_following(acc_id)
    for x in json.loads(dd.data):
        suggestions[x["id"]] += 1
        lookup[x["id"]] = x

suggestion_list = [
    lookup[x]
    for x, cc in suggestions.items()
    if cc > 3
    if x not in following_ids + [account_id]
]

suggestion_list = sorted(
    suggestion_list,
    key=lambda x: x["last_status_at"] if x["last_status_at"] else "",
    reverse=True,
)


table = Table(title="Suggested people to follow")

table.add_column("Display name")
table.add_column("Last Status Update")
table.add_column("url")

suggestions_left = 5

for user in suggestion_list:

    suggestion, created = Suggestion.get_or_create(account_id=user["id"])

    # if user["discoverable"]:
    if created:
        table.add_row(user["display_name"], user["last_status_at"], user["url"])
        suggestions_left -= 1

    if suggestions_left == 0:
        break

print()
print(table)
