import yaml
import requests
import os
import re

from rich.progress import Progress


class MastodonClient:
    def __init__(self, username):
        acct, instance = username.split("@")

        self.acct = acct
        self.instance = instance

    def get_following(self, account_id, acct):
        following = []

        # print(acct)
        if "@" in acct:
            username, instance = acct.split("@")
        else:
            username = acct
            instance = self.instance

        resp = requests.get(
            f"https://{instance}/api/v1/accounts/lookup", params={"acct": username}
        )

        if not resp.ok:
            return []

        account_id = resp.json()["id"]

        print(f"Retrieved account_id {account_id} for {acct} on {instance}")

        urls_to_check = [f"https://{instance}/api/v1/accounts/{account_id}/following"]
        urls_checked = []

        print(f"Retrieving people being followed by Account {acct}")

        with Progress() as progress:
            task_id = progress.add_task(f"Fetching people {acct} follows")
            while len(urls_to_check) > 0:
                url = urls_to_check.pop()
                urls_checked.append(url)

                resp = requests.get(url)

                following_ids = [x["id"] for x in following]
                following += [
                    x
                    for x in resp.json()
                    if type(x) == dict and x["id"] not in following_ids
                ]

                progress.update(
                    task_id,
                    description=f"...Retrieved {len(following)} people being followed by account {acct}",
                )

                if "link" in resp.headers:
                    links = resp.headers["link"].split(",")
                    links = [re.search(r"<(.*?)>", l)[1] for l in links]
                    urls_to_check += [l for l in links if l not in urls_checked]

        print(f"Retrieved {len(following)} people being followed by account {acct}")

        return following
