#!/usr/bin/env bash
set -euo pipefail

echo "Seeding database with sample data..."

docker-compose exec -T postgres psql -U media_user -d media_platform <<'SQL'
INSERT INTO users (email, username, password_hash, display_name)
VALUES ('test@example.com', 'testuser', 'hashed-password', 'Test User')
ON CONFLICT (email) DO NOTHING;

INSERT INTO contents (title, description, type)
VALUES ('Sample Content', 'Seeded sample content', 'podcast')
ON CONFLICT (title) DO NOTHING;

INSERT INTO episodes (content_id, title, duration)
VALUES ((SELECT id FROM contents LIMIT 1), 'Episode 1', 3600)
ON CONFLICT (title) DO NOTHING;

\q
SQL

echo "Seeding complete."
