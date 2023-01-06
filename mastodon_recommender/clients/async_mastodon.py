import asyncio
import aiohttp
import json

from ..helpers import to_iso


class AsyncMastodonClient:
    def __init__(self):
        pass

    async def local_hashtag_timeline(self, instances, hashtag):
        async with aiohttp.ClientSession() as session:
            result = await asyncio.gather(
                *[
                    self.local_hashtag_timeline_for_instance(session, instance, hashtag)
                    for instance in instances
                ]
            )

        return result

    async def local_hashtag_timeline_for_instance(self, session, instance, hashtag):
        url = f"https://{instance}/api/v1/timelines/tag/{hashtag}?limit=40"
        try:
            async with session.get(url=url) as response:
                resp = await response.text()
                result = json.loads(resp)
                if not isinstance(result, list):
                    result = []
                return {"instance": instance, "result": result}
        except Exception as e:
            print("Unable to get url {} due to {}.".format(url, e.__class__))
            print(e)

        return {"instance": instance, "result": []}

    async def hashtag_timeline_until(self, instances, hashtag, time_limit):
        async with aiohttp.ClientSession() as session:
            result = await asyncio.gather(
                *[
                    self.hashtag_timeline_until_for_instance(
                        session, instance, hashtag, time_limit
                    )
                    for instance in instances
                ]
            )

        return result

    async def hashtag_timeline_until_for_instance(
        self, session, instance, hashtag, time_limit
    ):

        result = []
        urls = [f"https://{instance}/api/v1/timelines/tag/{hashtag}?limit=40"]

        try:
            while len(urls) > 0:
                url = urls.pop()
                async with session.get(url=url) as response:
                    resp = await response.text()
                    result += json.loads(resp)

                    dt = to_iso(result[-1]["created_at"])

                    if dt > time_limit and "next" in response.links:
                        urls.append(response.links["next"]["url"])

        except Exception as e:
            print("Unable to get url {} due to {}.".format(url, e.__class__))
            print(e)

        try:
            result = [x["url"] for x in result]
        except Exception as e:
            print(f"Fetching for instance {instance} the following error occured")
            print(e)

            result = []

        return {"instance": instance, "result": result}
