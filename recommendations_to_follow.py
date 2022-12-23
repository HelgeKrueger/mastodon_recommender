import requests
import json
from collections import defaultdict

from mastodon import MastodonClient
from database import Suggestion, Following

from rich import print
from rich.table import Table
from rich.prompt import Prompt

from datetime import date, timedelta

from argparse import ArgumentParser

parser = ArgumentParser()
parser.add_argument("--update_own_followers", action="store_true", default=False)
args = parser.parse_args()


account_id = Prompt.ask(
    "Please enter your [bold]mastodon username[/bold] (e.g. [italic]helgek@mas.to[/italic])"
)


mc = MastodonClient(account_id)


def get_following(account_id, acct, force_update=False):
    data, created = Following.get_or_create(account_id=account_id)

    if not created and not force_update:
        return data

    following = mc.get_following(account_id, acct)
    data.data = json.dumps(following)
    data.save()

    return data


suggestions = defaultdict(int)

lookup = {}

following = json.loads(
    get_following(account_id, account_id, force_update=args.update_own_followers).data
)
following_ids = [(x["id"], x["acct"]) for x in following]

for acc_id, acct in following_ids:
    print()
    print(f"Local Account ID {acc_id} for {acct}")

    dd = get_following(acc_id, acct)
    try:
        for x in json.loads(dd.data):
            suggestions[x["acct"]] += 1
            lookup[x["acct"]] = x
    except:
        print(f"Something is wrong with data for {acct}")

suggestion_list = [
    (cc, lookup[x])
    for x, cc in suggestions.items()
    if cc > 3
    if x not in [y[1] for y in following_ids] + [account_id]
]

suggestion_list = sorted(
    suggestion_list,
    key=lambda x: x[0],
    reverse=True,
)


table = Table(title="Suggested people to follow")

table.add_column("Display name")
table.add_column("Last Status Update")
table.add_column("url")
table.add_column("Followed by")

suggestions_left = 5


def should_display_suggestion(user):
    if not user["discoverable"]:
        return False

    try:
        last_status = date.fromisoformat(user["last_status_at"])
    except:
        return False

    if date.today() - last_status > timedelta(days=3):
        return False

    return True


for count, user in suggestion_list:
    suggestion, created = Suggestion.get_or_create(account_id=user["id"])

    if should_display_suggestion(user):
        if created:
            table.add_row(
                user["display_name"], user["last_status_at"], user["url"], f"{count}"
            )
            suggestions_left -= 1

    if suggestions_left == 0:
        break

print()
print(table)
