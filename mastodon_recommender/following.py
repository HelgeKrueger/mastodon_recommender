import json

from .mastodon import MastodonClient
from .database import Following


class FollowingCollection:
    def __init__(self, account):
        self.account = account
        self.mastedon = MastodonClient(account)
        self.collection = []
        self.following = []

    def fetch_for_own_account(self, force=False):
        following_data = self.get_following(self.account, force_update=force)

        self.following = json.loads(following_data.data)

        return self.following

    def fetch_for_accounts_being_followed(self):
        accounts_list = [(x["acct"], x["following_count"]) for x in self.following]

        for acct, following_count in accounts_list:
            self.collection.append(
                self.get_following(acct, following_count=following_count)
            )

    def get_following(self, acct, force_update=False, following_count=None):
        data, created = Following.get_or_create(account=acct)

        if not created and not force_update:
            return data

        following = self.mastedon.get_following(acct, following_count=following_count)

        following = self._sanitize_following(following)

        data.data = json.dumps(following)
        data.save()

        return data

    def _sanitize_following(self, following):
        keys_to_keep = [
            "acct",
            "display_name",
            "discoverable",
            "following_count",
            "last_status_at",
            "url",
        ]

        return [
            {key: val for key, val in x.items() if key in keys_to_keep}
            for x in following
        ]
