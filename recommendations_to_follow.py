import json
import os
import yaml
from collections import defaultdict
from datetime import date, timedelta

from argparse import ArgumentParser


from rich import print
from rich.prompt import Prompt


from mastedon_recommender import display_table
from mastodon import MastodonClient
from database import Suggestion, Following

parser = ArgumentParser()
parser.add_argument("--update_own_followers", action="store_true", default=False)
parser.add_argument("--test_run", action="store_true", default=False)

args = parser.parse_args()

if os.path.exists("config_mastodon.yaml"):
    with open("config_mastodon.yaml") as f:
        config = yaml.safe_load(f)
else:
    config = {}

if "account_id" in config:
    account_id = config["account_id"]
else:
    account_id = Prompt.ask(
        "Please enter your [bold]mastodon username[/bold] (e.g. [italic]helgek@mas.to[/italic])"
    )
    config["account_id"] = account_id
    with open("config_mastodon.yaml", "w") as f:
        f.write(yaml.dump(config))


mc = MastodonClient(account_id)


def get_following(account_id, acct, force_update=False, following_count=None):
    data, created = Following.get_or_create(account_id=account_id)

    if not created and not force_update:
        return data

    following = mc.get_following(account_id, acct, following_count=following_count)
    data.data = json.dumps(following)
    data.save()

    return data


suggestions = defaultdict(int)

lookup = {}

following = json.loads(
    get_following(account_id, account_id, force_update=args.update_own_followers).data
)

following_ids = [(x["id"], x["acct"], x["following_count"]) for x in following]

for acc_id, acct, following_count in following_ids:
    # print()
    # print(f"Local Account ID {acc_id} for {acct}")

    dd = get_following(acc_id, acct, following_count=following_count)
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


to_display = []


for count, user in suggestion_list:
    if args.test_run:
        created = True
    else:
        suggestion, created = Suggestion.get_or_create(account_id=user["id"])

    if should_display_suggestion(user):
        if created:
            to_display.append((count, user))
            suggestions_left -= 1

    if suggestions_left == 0:
        break

display_table(to_display)
