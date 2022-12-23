from datetime import date

from peewee import SqliteDatabase, Model, CharField, DateField, TextField

db = SqliteDatabase("account_data.db")


class Following(Model):
    account = CharField(unique=True)
    created = DateField(default=date.today())
    data = TextField(default="")

    class Meta:
        database = db


class Suggestion(Model):
    account = CharField(unique=True)
    created = DateField(default=date.today())

    class Meta:
        database = db


class ConfigurationVariable(Model):
    key = CharField(unique=True)
    value = CharField(null=True, default=None)

    class Meta:
        database = db


db.create_tables([Following, Suggestion, ConfigurationVariable])
