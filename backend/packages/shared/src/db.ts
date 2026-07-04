import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL || 'postgresql://media_user:media_password@postgres:5432/media_platform';

export const pool = new Pool({ connectionString });

export async function query(text: string, params?: any[]) {
  return pool.query(text, params);
}

export default { pool, query };
