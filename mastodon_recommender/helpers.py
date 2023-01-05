from datetime import datetime, timedelta


def to_iso(dt):
    return datetime.fromisoformat(dt[:19] + "+00:00")
