import json

from collections import defaultdict
from datetime import date, timedelta


class Recommender:
    def __init__(self, following_collection):
        self.collection = following_collection.collection
        self.following = following_collection.following

        self.lookup = {}
        self.times_followed = defaultdict(int)

        self.max_time_since_last_post = timedelta(days=3)
        self.minimal_count_of_common_following = 3

    def build_lists(self):
        for entry in self.collection:
            try:
                data = json.loads(entry.data)
            except:
                print(f"Something is wrong with data for {entry.account}")
                continue

            for user in data:
                if self._should_user_be_suggested(user):
                    acct = user["acct"]
                    self.lookup[acct] = user
                    self.times_followed[acct] += 1

    def get_suggestions(self):
        suggestions = [
            (count, self.lookup[acct])
            for acct, count in self.times_followed.items()
            if count > self.minimal_count_of_common_following
        ]

        return sorted(suggestions, key=lambda x: x[0], reverse=True)

    def _should_user_be_suggested(self, user):
        if not user["discoverable"]:
            return False

        try:
            last_status = date.fromisoformat(user["last_status_at"])
        except:
            return False

        if date.today() - last_status > self.max_time_since_last_post:
            return False

        return True
