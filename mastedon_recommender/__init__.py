from rich import print
from rich.table import Table


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
