from .clients.async_mastodon import AsyncMastodonClient


class HashtagCollector:
    def __init__(self, instances):
        self.instances = instances
        self.client = AsyncMastodonClient()
        self.data_per_instance = {}

    async def fetch(self):
        result = await self.client.hashtag_trends(self.instances)

        self.data_per_instance = {x["instance"]: x["result"] for x in result}
