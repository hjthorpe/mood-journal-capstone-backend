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
  client.connect();
  const text = 'INSERT INTO moodjournalentries(title, content, mood ) VALUES($1, $2, $3) RETURNING *';
  // const values = ['Hannah', 'Im pressed because this damn thing is due Friday', 'Stressed'];
  client.query(text, values,
    (response)=>{
      console.log(response);
      res.status(201).json({status: 'success', msg: 'Entry added'});
      client.end();
    });
};

const updateEntry = (req, res) => {
  client.connect();
  client.query(
    'UPDATE moodjournalentries SET title="check", content="hello", mood="tired" WHERE id=2 RETURNING *', 
    (response) => {
      console.log(response);
      res.status(201).json({status: 'success', msg: 'Entry has been updated'});
      client.end();
    });
};

const deleteEntry = (req, res) => {
  client.connect();
  client.query('DELETE from moodjournalentries WHERE id=1',(response)=>{
    console.log(response);
    res.status(204).json();
    client.end();
  });
};

app
  .route('/api/moodjournal/entries')
  .get(getEntries)
  .post(addEntry);

app
  .route('/api/moodjournal/entries/:id')
  .patch(updateEntry)
  .delete(deleteEntry);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = {app};