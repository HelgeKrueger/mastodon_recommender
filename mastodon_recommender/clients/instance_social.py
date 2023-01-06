import requests

from ..database import ConfigurationVariable


class InstanceSocialClient:
    def __init__(self, access_token=None):
        access_token_item, created = ConfigurationVariable.get_or_create(
            key="access_token"
        )

        if access_token:
            access_token_item.value = access_token
            access_token_item.save()

        self.access_token = access_token_item.value

    def fetch(self):
        url = "https://instances.social/api/1.0/instances/list"

        headers = {"Authorization": f"Bearer {self.access_token}"}

        response = requests.get(
            url,
            headers=headers,
            params={"sort_by": "active_users", "sort_order": "desc", "count": 1000},
        )

        data = response.json()
        return [
            {"name": x["name"], "users": x["active_users"]} for x in data["instances"]
        ]
