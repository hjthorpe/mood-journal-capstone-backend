require('dotenv').config();
const { Pool, Client } = require('pg');
const isProduction = process.env.NODE_ENV === 'production';

const connectionString = 
'postgressql://postgres:Antolini1@localhost:5432/mood-journal-capstone';

const client = new Client({
  connectionString:connectionString
});




const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mood-journal-capstone',
  // password: 'Antolini1',
  port: 5432
});




module.exports = {
  client,
  pool
};

