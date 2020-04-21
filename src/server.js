// ** BEGIN MOOD-JOURNAL-CAPSTONE SERVER ** //

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { client, pool } = require('./config');

const app = express();

const PORT = process.env.PORT || 3000;
const {CLIENT_ORIGIN} = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

const getEntries = (req, res) => {
  client.connect();
  client.query('SELECT * from moodjournalentries',(response) => {
    res.status(200).json(response.rows);
    client.end();
  });

};

const addEntry = (req, res) => {
  const { title, content, mood } = req.body;
  pool.query('INSERT INTO moodjournalentries(title, content, mood)values("Hannah", "Im pressed because this damn thing is due Friday", "Stressed")' [title, content, mood],(response)=>{
    console.log(response);
    res.status(201).json({status: 'success', msg: 'Entry added'});
    pool.end();
  });    
};

app
  .route('/api/moodjournal/entries')
  .get(getEntries)
  .post(addEntry);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = {app};