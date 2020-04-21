require('dotenv').config();
const { Pool, Client } = require('pg');
const isProduction = process.env.NODE_ENV === 'production';

const connectionString = 
'postgressql://postgres:Antolini1@localhost:5432/mood-journal-capstone';

const client = new Client({
  connectionString:connectionString
});

// client.connect();
// client.query('SELECT * from moodjournalentries',(err,res) => {
//   console.log(err,res);
//   client.end();
// });


// const pool = new Pool({
//   connectionString: isProduction ? process.env.DATABASE_URL :
//     connectionString,
//   ssl: isProduction,
// });


module.exports = {
  client
};

