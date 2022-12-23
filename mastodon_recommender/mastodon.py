import re

import requests
from rich.progress import Progress


class MastodonClient:
    def __init__(self, username):
        acct, instance = username.split("@")

        self.acct = acct
        self.instance = instance

    def get_following(self, acct, following_count=None):
        following = []

        # print(acct)
        if "@" in acct:
            username, instance = acct.split("@")
        else:
            username = acct
            instance = self.instance

        resp = requests.get(
            f"https://{instance}/api/v1/accounts/lookup",
            params={"acct": username},
            timeout=60,
        )

        if not resp.ok:
            return []

        account_id = resp.json()["id"]

        # print(f"Retrieved account_id {account_id} for {acct} on {instance}")

        urls_to_check = [f"https://{instance}/api/v1/accounts/{account_id}/following"]
        urls_checked = []

        with Progress(transient=True) as progress:
            task_id = progress.add_task(
                f"Downloading for {username}@{instance}: ", total=following_count
            )
            while len(urls_to_check) > 0:
                url = urls_to_check.pop()
                urls_checked.append(url)

                resp = requests.get(
                    url,
                    timeout=60,
                )

                following_ids = [x["id"] for x in following]
                following += [
                    x
                    for x in resp.json()
                    if isinstance(x, dict) and x["id"] not in following_ids
                ]

                progress.update(task_id, completed=len(following))

                if "link" in resp.headers:
                    links = resp.headers["link"].split(",")
                    links = [l for l in links if "next" in l]
                    links = [re.search(r"<(.*?)>", l)[1] for l in links]
                    urls_to_check += [l for l in links if l not in urls_checked]

            print(
                f"Retrieved {len(following):5} people being followed by  {username}@{instance}",
            )

        return following
