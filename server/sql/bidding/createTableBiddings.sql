CREATE TABLE IF NOT EXISTS biddings (
	bid_id TEXT NOT NULL,
	user_id TEXT NOT NULL,
	slot INTEGER NOT NULL,
	bid INTEGER NOT NULL,
	added_ts TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc')
);

CREATE INDEX IF NOT EXITS biddings_idx_slot_bid ON biddings (slot, bid);