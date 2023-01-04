from .mastodon import MastodonClient


class HashtagAnalyzer:
    def __init__(self, hashtag, instances=[], statuses_to_take=10):
        self.mc = MastodonClient("aa@bb")
        self.instances = instances
        self.hashtag = hashtag
        self.statuses_to_take = 10

        self.statuses_by_instance = {}

    def fetch(self):
        for instance in self.instances:
            data = self.mc.hashtag_timeline(instance, self.hashtag)
            data = [x["url"] for x in data]
            self.statuses_by_instance[instance] = data

    def hypergraph_data(self):
        relevant_statuses = self.status_urls_to_plot()

        return {
            instance: [x for x in value if x in relevant_statuses]
            for instance, value in self.statuses_by_instance.items()
        }

    def status_urls_to_plot(self):
        result = sum(
            (x[: self.statuses_to_take] for x in self.statuses_by_instance.values()), []
        )

        result = list(set(result))

        return result
