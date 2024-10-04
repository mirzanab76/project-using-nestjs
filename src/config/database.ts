// src/config/database.ts
import pgPromise from 'pg-promise';

const pgp = pgPromise({});
const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'nestjs', // Ganti dengan nama database kamu
  user: 'postgres', // Ganti dengan username PostgreSQL kamu
  password: 'password' // Ganti dengan password PostgreSQL kamu
});

export default db;
