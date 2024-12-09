start_db:
	docker compose up -d

stop_db:
	docker compose down

server_start:
	npm run dev
	
migrate:
	db-migrate up

migrate_down: 
	db-migrate down

create_migration: 
	db-migrate create $(n) --sql-file

.PHONEY: start_db stop_db server_start migrate migrate_down create_migration