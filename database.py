from peewee import *
from datetime import date


db = SqliteDatabase("account_data.db")


class Following(Model):
    account_id = CharField(unique=True)
    created = DateField(default=date.today())
    data = TextField(default="")

    class Meta:
        database = db


class Suggestion(Model):
    account_id = CharField(unique=True)
    created = DateField(default=date.today())

    class Meta:
        database = db


db.create_tables([Following, Suggestion])
