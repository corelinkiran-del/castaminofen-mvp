#!/usr/bin/env bash
set -euo pipefail

echo "Running DB migrations against postgres container..."

docker-compose exec -T postgres psql -U media_user -d media_platform <<'SQL'
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  display_name TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contents (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS episodes (
  id SERIAL PRIMARY KEY,
  content_id INTEGER REFERENCES contents(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  duration INTEGER,
  created_at TIMESTAMP DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_contents_type ON contents(type);

\q
SQL

echo "Migrations applied."
