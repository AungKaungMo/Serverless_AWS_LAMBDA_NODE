CREATE TABLE "address" (
    "id"          bigserial PRIMARY KEY,
    "user_id"     bigint NOT NULL,
    "addresses"   text,
    "city"        varchar,
    "postal_code" integer,
    "country"     varchar,
    "created_at"  timestamptz NOT NULL DEFAULT now(),
    "updated_at"  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_address_city ON "address" ("city");
CREATE INDEX idx_address_postal_code ON "address" ("postal_code");
CREATE INDEX idx_address_country ON "address" ("country");

ALTER TABLE "address" 
ADD CONSTRAINT fk_user_id FOREIGN KEY ("user_id") 
REFERENCES "users" ("user_id");
