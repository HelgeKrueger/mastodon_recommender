import re

import requests
from rich.progress import Progress
from rich import print

from .database import ConfigurationVariable


class MastodonClient:
    def __init__(self, username):
        acct, instance = username.split("@")

        self.acct = acct
        self.instance = instance

        access_token, created = ConfigurationVariable.get_or_create(key="access_token")
        self.access_token = access_token.value

    def register(self):
        app_name = "Mastodon Recommender"

        client_id, created_id = ConfigurationVariable.get_or_create(key="client_id")
        client_secret, created_secret = ConfigurationVariable.get_or_create(
            key="client_secret"
        )

        if (
            created_id
            or created_secret
            or not client_id.value
            or not client_secret.value
        ):
            response = requests.post(
                f"https://{self.instance}/api/v1/apps",
                data={
                    "client_name": app_name,
                    "redirect_uris": "urn:ietf:wg:oauth:2.0:oob",
                    "scopes": "read",
                },
            )

            app_data = response.json()

            client_id.value = app_data["client_id"]
            client_secret.value = app_data["client_secret"]

            client_id.save()
            client_secret.save()

        self.client_id = client_id.value
        self.client_secret = client_secret.value

    def get_authorization_url(self):
        return f"https://{self.instance}/oauth/authorize?response_type=code&client_id={self.client_id}&redirect_uri=urn:ietf:wg:oauth:2.0:oob"

    def authorize(self, code):
        access_token, created = ConfigurationVariable.get_or_create(key="access_token")

        if created or not access_token.value:
            response = requests.post(
                f"https://{self.instance}/oauth/token",
                data={
                    "grant_type": "authorization_code",
                    "code": code,
                    "client_id": self.client_id,
                    "client_secret": self.client_secret,
                    "redirect_uri": "urn:ietf:wg:oauth:2.0:oob",
                },
            )
            access_token.value = response.json()["access_token"]
            access_token.save()

        self.access_token = access_token.value
        return self.access_token

    def split_acct(self, acct):
        if "@" in acct:
            username, instance = acct.split("@")
        else:
            username = acct
            instance = self.instance

        return username, instance

    def lookup_account_id(self, instance, username, headers={}):
        resp = requests.get(
            f"https://{instance}/api/v1/accounts/lookup",
            params={"acct": username},
            timeout=60,
            headers=headers,
        )

        if not resp.ok:
            return

        return resp.json()["id"]

    def descendants_for_status_id(self, instance, status_id, headers={}):
        resp = requests.get(
            f"https://{instance}/api/v1/statuses/{status_id}/context",
            timeout=60,
            headers=headers,
        )

        if not resp.ok:
            return

        return resp.json()["descendants"]

    def account_statuses(self, instance, account_id, headers={}):
        resp = requests.get(
            f"https://{instance}/api/v1/accounts/{account_id}/statuses",
            timeout=60,
            headers=headers,
        )

        if not resp.ok:
            return

        return resp.json()

    def get_following(self, acct, following_count=None):
        following = []

        headers = {}

        # print(acct)

        username, instance = self.split_acct(acct)

        if self.access_token and instance == self.instance:
            headers["Authorization"] = f"Bearer {self.access_token}"

        account_id = self.lookup_account_id(instance, username, headers=headers)

        if account_id is None:
            return []

        # print(f"Retrieved account_id {account_id} for {acct} on {instance}")

        urls_to_check = [
            f"https://{instance}/api/v1/accounts/{account_id}/following?limit=80"
        ]
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
                    headers=headers,
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
