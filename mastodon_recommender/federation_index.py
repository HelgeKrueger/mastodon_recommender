import asyncio
import seaborn as sns
import pandas as pd
import numpy as np

from .async_mastodon import AsyncMastodonClient
from .helpers import to_iso


class FederationIndex:
    def __init__(self, instances, time_limit, maximal_number_of_post_per_instance=5):
        self.instances = instances
        self.client = AsyncMastodonClient()

        self.federation_indices_by_instance = {
            instance: {} for instance in self.instances
        }

        self.time_limit = time_limit
        self.maximal_number_of_post_per_instance = maximal_number_of_post_per_instance
        self.hashtags = []

    async def fetch_for_hashtag(self, hashtag):
        self.hashtags.append(hashtag)

        # loop = asyncio.get_event_loop()
        # data = loop.run_until_complete(
        data = await self.client.local_hashtag_timeline(self.instances, hashtag)
        # )

        urls_to_test = sum(
            (
                [
                    x["url"]
                    for x in entry["result"][: self.maximal_number_of_post_per_instance]
                    if to_iso(x["created_at"]) > self.time_limit
                ]
                for entry in data
            ),
            [],
        )
        urls_to_test = list(set(urls_to_test))

        count = len(urls_to_test)
        if count == 0:
            print(f"No entries found for hashtag {hashtag}")
            return

        urls_for_instance_list = await self.client.hashtag_timeline_until(
            self.instances, hashtag, self.time_limit
        )

        urls_for_instance = {x["instance"]: x["result"] for x in urls_for_instance_list}

        for instance in self.instances:
            occurences = len(
                [url for url in urls_to_test if url in urls_for_instance[instance]]
            )
            self.federation_indices_by_instance[instance][hashtag] = occurences / count

    def plot_federation_index(self):
        df = pd.DataFrame.from_records(
            [
                {
                    "instance": instance,
                    "federation_index": np.mean(
                        [
                            x
                            for x in self.federation_indices_by_instance[
                                instance
                            ].values()
                        ]
                    ),
                }
                for instance in self.instances
            ]
        )
        df = df.sort_values(by="federation_index", ascending=False)

        rel = sns.barplot(data=df, x="federation_index", y="instance")
        rel.set_title(f"Mean Federation Index Deviation")

        return rel

    def plot_federation_index_for_hashtag(self, hashtag):
        df = pd.DataFrame.from_records(
            [
                {
                    "instance": instance,
                    "federation_index": self.federation_indices_by_instance[instance][
                        hashtag
                    ],
                }
                for instance in self.instances
            ]
        )
        df = df.sort_values(by="federation_index", ascending=False)

        rel = sns.barplot(data=df, x="federation_index", y="instance")
        rel.set_title(f"Federation Index Deviation for #{hashtag}")

        return rel

    def plot_federation_index_for_instance(self, instance):
        df = pd.DataFrame.from_records(self.federation_indices_by_instance[instance])
        df = df.sort_values(by="federation_index", ascending=False)

        rel = sns.barplot(data=df, x="federation_index", y="instance")
        rel.set_title(f"Federation Index Deviation for {instance}")

        return rel

    def plot_federation_index_deviation_for_hashtag(self, hashtag):
        df = pd.DataFrame.from_records(
            [
                {
                    "instance": instance,
                    "federation_index": self.federation_indices_by_instance[instance][
                        hashtag
                    ]
                    - np.mean(
                        [
                            x
                            for x in self.federation_indices_by_instance[
                                instance
                            ].values()
                        ]
                    ),
                }
                for instance in self.instances
            ]
        )
        df = df.sort_values(by="federation_index", ascending=False)

        rel = sns.barplot(data=df, x="federation_index", y="instance")
        rel.set_title(f"Federation Index Deviation for #{hashtag}")

        return rel

    def plot_federation_index_deviation_for_instance(self, instance):
        mean = np.mean(
            [x for x in self.federation_indices_by_instance[instance].values()]
        )
        df = pd.DataFrame.from_records(
            [
                {"hashtag": hashtag, "federation_index": value - mean}
                for hashtag, value in self.federation_indices_by_instance[
                    instance
                ].items()
            ]
        )

        df = df.sort_values(by="federation_index", ascending=False)

        rel = sns.barplot(data=df, x="federation_index", y="hashtag")
        rel.set_title(f"Federation Index Deviation for {instance}")

        return rel
