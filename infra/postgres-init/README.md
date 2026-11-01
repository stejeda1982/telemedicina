# PostgreSQL init scripts

`01-create-dbs.sh` is executed by the postgres image entrypoint on first start.
It creates the 12 databases defined in `POSTGRES_MULTIPLE_DATABASES` env var.
