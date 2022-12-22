import yaml
import requests
import os
import re


class MastodonClient:
    def __init__(self):
        self.config = self._load_config()

        self.instance = self.config["instance"]
        if "access_token" in self.config:
            self.access_token = self.config["access_token"]

    def _load_config(self):
        if os.path.exists("config_mastodon.yaml"):
            with open("config_mastodon.yaml", "r") as f:
                return yaml.safe_load(f)
        else:
            return self.register()

    def register(self):
        self.instance = input("What instance do you want to use: ")

        if self.instance.startswith("https://"):
            self.instance = self.instance[8:]

        post_data = {
            "client_name": "Follow recommendations",
            "redirect_uris": "urn:ietf:wg:oauth:2.0:oob",
            "scopes": "read",
            "website": "http://127.0.0.1",
        }

        result = requests.post(f"https://{self.instance}/api/v1/apps", data=post_data)

        data = result.json()
        client_id = data["client_id"]
        client_secret = data["client_secret"]

        config = {
            "instance": self.instance,
            "client_id": client_id,
            "client_secret": client_secret,
        }

        with open("config_mastodon.yaml", "w") as f:
            f.write(yaml.dump(config))

        return config

    def _save_config(self):
        with open("config_mastodon.yaml", "w") as f:
            f.write(yaml.dump(self.config))

    def _default_headers(self):
        return {"Authorization": f"Bearer {self.access_token}"}

    def get_url_for_code(self):
        client_id = self.config["client_id"]

        return f"https://{self.instance}/oauth/authorize?client_id={client_id}&scope=read&redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=code"

    def use_code(self, code):
        post_data = {
            "client_id": self.config["client_id"],
            "client_secret": self.config["client_secret"],
            "redirect_uri": "urn:ietf:wg:oauth:2.0:oob",
            "grant_type": "authorization_code",
            "code": code,
            "scope": "read",
        }
        response = requests.post(f"https://{self.instance}/oauth/token", data=post_data)

        self.access_token = response.json()["access_token"]

        self.config["access_token"] = self.access_token
        self._save_config()

    def get_user(self):
        resp = requests.get(
            f"https://{self.instance}/api/v1/accounts/verify_credentials",
            headers=self._default_headers(),
        )

        return {"id": resp.json()["id"], "name": resp.json()["display_name"]}

    def get_following(self, account_id):
        following = []

        urls_to_check = [
            f"https://{self.instance}/api/v1/accounts/{account_id}/following"
        ]
        urls_checked = []

        print(f"Retrieving followers for Account id {account_id}")

        while len(urls_to_check) > 0:
            url = urls_to_check.pop()
            urls_checked.append(url)

            resp = requests.get(
                url,
                headers=self._default_headers(),
            )

            following_ids = [x["id"] for x in following]
            following += [x for x in resp.json() if x["id"] not in following_ids]

            if "link" in resp.headers:
                links = resp.headers["link"].split(",")
                links = [re.search(r"<(.*?)>", l)[1] for l in links]
                urls_to_check += [l for l in links if l not in urls_checked]

        print(f"Retrieved {len(following)} followers for Account id {account_id}")

        return following
