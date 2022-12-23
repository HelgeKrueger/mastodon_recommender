# mastodon_recommender

Usage

```
pip install git+https://github.com/HelgeKrueger/mastodon_recommender.git#egg=mastodon_recommender
```

then you can run the script via

```
recommendations_to_follow
```

The result of the list of followers is cached. Cache invalidation for own followers can be achieved by running:

```
recommendations_to_follow --update_own_followers
```

Cache invalidation for other accounts can be achieved by deleting `account_data.db`.

## Development

Development is done via `pipenv`. Tests can be run via `pytest` and code is formatted with `black`.
