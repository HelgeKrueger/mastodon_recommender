from setuptools import setup

setup(
    name="mastodon_recommender",
    version="0.1",
    description="Recommender for who to follow on Mastodon",
    url="https://github.com/HelgeKrueger/mastodon_recommender/",
    author="Helge Krueger",
    author_email="helge.krueger@gmail.com",
    license="MIT",
    packages=["mastodon_recommender"],
    install_requires=["peewee", "requests", "rich", "aiohttp"],
    scripts=["recommendations_to_follow"],
    zip_safe=False,
)
