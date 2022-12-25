from .following import FollowingCollection


def test_sanitize():
    entry = {
        "id": "217497",
        "username": "feditips",
        "acct": "feditips",
        "display_name": "Fedi.Tips 🎄",
        "locked": False,
        "bot": False,
        "discoverable": True,
        "group": False,
        "created_at": "2020-11-16T00:00:00.000Z",
        "note": "<p>Modified so it's shorter</p>",
        "url": "https://mstdn.social/@feditips",
        "avatar": "https://media.mas.to/...g",
        "avatar_static": "https://media.mas.to/....png",
        "header": "https://media.mas.to/../4b1f.png",
        "header_static": "https://media.mas.to/...f.png",
        "followers_count": 157017,
        "following_count": 567,
        "statuses_count": 3047,
        "last_status_at": "2022-12-22",
    }

    following_collection = FollowingCollection("account@instance")

    parsed = following_collection._sanitize_following([entry], "mstdn.social")

    assert len(parsed) == 1
    assert set(parsed[0].keys()) == {
        "acct",
        "display_name",
        "discoverable",
        "following_count",
        "last_status_at",
        "url",
    }

    assert parsed[0]["acct"] == "feditips@mstdn.social"
