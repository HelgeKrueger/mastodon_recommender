from .mastodon import MastodonClient


def test_get_following():
    mastedon_client = MastodonClient("helgek@mas.to")

    following = mastedon_client.get_following("helgek")

    assert len(following) > 80
