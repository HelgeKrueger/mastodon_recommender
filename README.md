# mastodon_recommender

Usage

```
pip install git+https://github.com/HelgeKrueger/mastodon_recommender.git#egg=mastodon_recommender
```

then you can run the script via

```
recommendations_to_follow
```

The output will look like

```
                                Suggested people to follow
┏━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━┓
┃ Display name   ┃ Last Status Update ┃ url                                 ┃ Followed by ┃
┡━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━┩
│ Suggestion     │ 2022-12-25         │ https://suggestion/@suggestion      │ 20          │
....
```

The result of the api calls is cached in the sqlite database `account_data.db`. Basic cache invalidation is implemented.

## Development

Development is done via `pipenv`. Tests can be run via `pytest` and code is formatted with `black`.

The file `following.py` contains the cache of the people are following. It's update logic can be configured by editing the values in `__init__`. Similarly, `recommender.py` contains the logic what users are being recommended.
