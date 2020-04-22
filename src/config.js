require('dotenv').config();
const { Pool, Client } = require('pg');
const isProduction = process.env.NODE_ENV === 'production';

const connectionString = 
'postgressql://postgres:Antolini1@localhost:5432/mood-journal-capstone';

const client = new Client({
  connectionString:connectionString
});





module.exports = {
  client
};

