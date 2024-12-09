CREATE TABLE "users" (
    "user_id"    bigserial PRIMARY KEY,
    "phone"      varchar NOT NULL,
    "email"      varchar NOT NULL,
    "password"   varchar NOT NULL,
    "salt"       varchar NOT NULL,
    "user_type"  varchar NOT NULL,
    "first_name" varchar,
    "last_name"  varchar,
    "profile"    text,
    "created_at" timestamptz NOT NULL DEFAULT (now()),
    "updated_at" timestamptz NOT NULL DEFAULT (now())
)
