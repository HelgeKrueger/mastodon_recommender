import json

from datetime import date, timedelta

from .mastodon import MastodonClient
from .database import Following


class FollowingCollection:
    def __init__(self, account):
        self.account = account
        self.mastedon = MastodonClient(account)
        self.collection = []
        self.following = []

        self.percentag_change_to_update = 10
        self.maximal_number_of_followers_to_update_often = 10000
        self.max_age_of_account = timedelta(days=7)

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
            try:
                following = json.loads(data.data)
            except json.JSONDecodeError:
                following = []

            if not self._is_following_stale(following, data, following_count):
                return data

        following = self.mastedon.get_following(acct, following_count=following_count)

        _, instance = self.mastedon.split_acct(acct)
        following = self._sanitize_following(following, instance)

        data.data = json.dumps(following)
        data.updated = date.today()
        data.save()

        return data

    def _is_following_stale(self, following, data, following_count):
        if following_count is None:
            # Means this is own account
            # FIXME: Horrible way to check

            if data.updated != date.today():
                return True

            return False

        if date.today() - data.updated > self.max_age_of_account:
            return True

        if len(following) == 0:  # probably impossible to fetch following
            return False

        change_in_following = abs(len(following) - following_count) / (
            following_count + 1
        )

        if (
            change_in_following > 0.01 * self.percentag_change_to_update
            and following_count < self.maximal_number_of_followers_to_update_often
            and len(following) < following_count
        ):
            print(f"For {data.account}, we have {len(following)} vs {following_count}")
            return True

        return False

    def _sanitize_following(self, following, instance):
        return [self._sanitize_following_account(x, instance) for x in following]

    def _sanitize_following_account(self, account, instance):
        keys_to_keep = [
            "acct",
            "display_name",
            "discoverable",
            "following_count",
            "last_status_at",
            "url",
        ]

        result = {key: val for key, val in account.items() if key in keys_to_keep}

        if "@" not in result["acct"]:
            result["acct"] = f"{result['acct']}@{instance}"

        return result
