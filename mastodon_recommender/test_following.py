from .following import FollowingCollection


def test_sanitize():
    entry = {
        "id": "217497",
        "username": "feditips",
        "acct": "feditips@mstdn.social",
        "display_name": "Fedi.Tips 🎄",
        "locked": False,
        "bot": False,
        "discoverable": True,
        "group": False,
        "created_at": "2020-11-16T00:00:00.000Z",
        "note": "<p>Posting hints and tips about Mastodon and the Fediverse 🌍 </p><p>There are lots of answers to common questions about...",
        "url": "https://mstdn.social/@feditips",
        "avatar": "https://media.mas.to/masto-public/cache/accounts/avatars/000/217/497/original/71383115c2103ade.png",
        "avatar_static": "https://media.mas.to/masto-public/cache/accounts/avatars/000/217/497/original/71383115c2103ade.png",
        "header": "https://media.mas.to/masto-public/cache/accounts/headers/000/217/497/original/3585895415614b1f.png",
        "header_static": "https://media.mas.to/masto-public/cache/accounts/headers/000/217/497/original/3585895415614b1f.png",
        "followers_count": 157017,
        "following_count": 567,
        "statuses_count": 3047,
        "last_status_at": "2022-12-22",
    }

    following_collection = FollowingCollection("account@instance")

    parsed = following_collection._sanitize_following([entry])

    assert len(parsed) == 1
    assert set(parsed[0].keys()) == {
        "acct",
        "display_name",
        "discoverable",
        "following_count",
        "last_status_at",
        "url",
    }
