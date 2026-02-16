import pkg from 'pg';
const { Pool } = pkg;

const poolConfig = {
  // Parsed from your string
  user: 'neondb_owner',
  host: 'ep-bold-cake-a1jg4nz0-pooler.ap-southeast-1.aws.neon.tech',
  database: 'neondb',
  password: 'npg_AjnHPv48tCzG', // <--- TYPE YOUR PASSWORD HERE
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // Required for Neon
  },
  connectionTimeoutMillis: 10000, 
};

export const pool = new Pool(poolConfig);

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Neon Connection Failed!');
    console.error('Message:', err.message);
    console.log('💡 TIP: If it says "timeout", turn on Cloudflare WARP/VPN.');
  } else {
    console.log('✅ Neon Cloud Connected:', res.rows[0].now);
  }
});