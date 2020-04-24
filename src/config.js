require('dotenv').config();
const { Pool, Client } = require('pg');
const isProduction = process.env.NODE_ENV === 'production';

const connectionString = 
'postgres://ciwpdhyfvebvqf:67d448cfbf7562f03873ec3ba8b91526fa7c0b9443f79bab8ad1d9c162820652@ec2-23-20-129-146.compute-1.amazonaws.com:5432/d60uf9sb83didd';

const client = new Client({
  connectionString:connectionString
});





module.exports = {
  client
};

