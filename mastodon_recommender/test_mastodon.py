import pytest

from .mastodon import MastodonClient


@pytest.mark.skip(reason="does request against server")
def test_get_following():
    mastedon_client = MastodonClient("helgek@mas.to")

    following = mastedon_client.get_following("helgek")

    assert len(following) > 80
