# mastodon_recommender

Usage

```
pipenv install
```

then

```
pipenv run python recommendations_to_follow.py
```

The result of the list of followers is cached. Cache invalidation for own followers can be achieved by running:

```
pipenv run python recommendations_to_follow.py --update_own_followers
```

Cache invalidation for other accounts can be achieved by deleting `account_data.db`.
