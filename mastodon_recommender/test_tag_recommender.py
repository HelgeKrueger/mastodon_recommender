from .tag_recommender import TagRecommender


def test_single_instance():
    tr = TagRecommender(["mas.to"])

    tr.fetch_data()

    data = tr.most_used_tags()

    assert len(tr.data) > 5
    assert "name" in tr.data[0]
    assert "url" in tr.data[0]
    assert "uses" in tr.data[0]
