import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config';

// 1. Configure the connection pool
// We use the DATABASE_URL from our .env file
const poolConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    // Neon requires SSL. 'rejectUnauthorized: false' allows the connection 
    // from local environments without complex certificate matching.
    rejectUnauthorized: false, 
  },
  // Senior Tip: Set a timeout so your app doesn't hang if the DB is asleep
  connectionTimeoutMillis: 10000, 
};

export const pool = new Pool(poolConfig);

// 2. The "Heartbeat" Check
// This code runs once when the server starts to confirm the cloud is reachable
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Neon Connection Failed:', err.message);
  } else {
    console.log('✅ Neon Cloud Connected:', res.rows[0].now);
  }
});