from argparse import ArgumentParser

from mastodon_recommender import display_table, get_own_account_name
from mastodon_recommender.database import Suggestion
from mastodon_recommender.following import FollowingCollection
from mastodon_recommender.recommender import Recommender


def main():
    parser = ArgumentParser()
    parser.add_argument("--update_own_followers", action="store_true", default=False)
    parser.add_argument("--test_run", action="store_true", default=False)

    args = parser.parse_args()

    account = get_own_account_name()

    following_collection = FollowingCollection(account)
    following_collection.fetch_for_own_account(force=args.update_own_followers)
    following_collection.fetch_for_accounts_being_followed()

    recommender = Recommender(following_collection)
    recommender.build_lists()

    suggestion_list = recommender.get_suggestions()
    suggestions_left = 5

    to_display = []

    for count, user in suggestion_list:
        if args.test_run:
            created = True
        else:
            _, created = Suggestion.get_or_create(account=user["acct"])

        if created:
            to_display.append((count, user))
            suggestions_left -= 1

        if suggestions_left == 0:
            break

    display_table(to_display)


if __name__ == "__main__":
    main()
