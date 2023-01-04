import requests

from time import time


class TagRecommender:
    def __init__(self, instance_names):
        self.instance_names = instance_names
        self.data = None

    def fetch_data(self):
        self.data = sum((self.get_trends(name) for name in self.instance_names), [])

    def most_used_tags(self):
        result = {}
        for entry in self.data:
            key = entry["name"].lower()
            if key not in result:
                result[key] = {
                    "name": entry["name"],
                    "uses": entry["uses"],
                    "max_uses": entry["uses"],
                    "url": entry["url"],
                }
            else:
                result[key]["uses"] += entry["uses"]

                if result[key]["max_uses"] < entry["uses"]:
                    result[key]["max_uses"] = entry["uses"]
                    result[key]["url"] = entry["url"]

        return sorted(list(result.values()), key=lambda x: x["uses"], reverse=True)

    def format_trend_entry(self, entry):
        history = entry["history"]

        uses = sum(int(history[j]["uses"]) for j in [0, 1])

        return {"name": entry["name"], "url": entry["url"], "uses": uses}

    def get_trends(self, instance):
        start_time = time()
        response = requests.get(f"https://{instance}/api/v1/trends/tags")
        print(f"Fetched trending tags from {instance} in {time() - start_time} seconds")
        if not response.ok:
            return []

        return [self.format_trend_entry(entry) for entry in response.json()]
