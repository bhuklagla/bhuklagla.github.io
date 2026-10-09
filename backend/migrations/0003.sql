CREATE TABLE IF NOT EXISTS notification_outbox (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  next_attempt_at INTEGER NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  delivered_at INTEGER,
  last_status INTEGER
);
CREATE INDEX IF NOT EXISTS notification_outbox_due ON notification_outbox(next_attempt_at) WHERE delivered_at IS NULL;
CREATE INDEX IF NOT EXISTS notification_outbox_created ON notification_outbox(created_at);
