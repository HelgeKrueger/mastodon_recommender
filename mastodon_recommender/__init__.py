from rich import print
from rich.table import Table
from rich.prompt import Prompt


from .database import ConfigurationVariable


def display_table(users):
    table = Table(title="Suggested people to follow")

    table.add_column("Display name")
    table.add_column("Last Status Update")
    table.add_column("url")
    table.add_column("Followed by")

    for count, user in users:
        table.add_row(
            user["display_name"], user["last_status_at"], user["url"], f"{count}"
        )

    print()
    print(table)


def get_own_account_name():
    account, created = ConfigurationVariable.get_or_create(key="account")

    if created or account.value is None:
        account.value = Prompt.ask(
            "Please enter your [bold]mastodon username[/bold] (e.g. [italic]helgek@mas.to[/italic])"
        )
        account.save()

    return account.value
