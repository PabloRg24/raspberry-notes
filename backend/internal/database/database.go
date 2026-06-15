package database

import (
	"database/sql"
	"os"

	_ "github.com/mattn/go-sqlite3"
)

func New(dbPath string) (*sql.DB, error) {
	db, err := sql.Open("sqlite3", dbPath)
	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		return nil, err
	}

	if err := migrate(db); err != nil {
		return nil, err
	}

	return db, nil
}

func migrate(db *sql.DB) error {
	schema, err := os.ReadFile("db/schema.sql")
	if err != nil {
		return err
	}

	_, err = db.Exec(string(schema))
	return err
}