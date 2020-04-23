// ** BEGIN MOOD-JOURNAL-CAPSTONE SERVER ** //

const express = require('express');
const nodemon = require('nodemon');
const bodyParser = require('body-parser');
const cors = require('cors');
const { client } = require('./config');

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
  client.query('SELECT * from moodjournalentries', (err, results) => {
    console.log(err ? err.stack : results.rows);
    res.status(200).json(results.rows);
  });

};

const addEntry = (req, res) => {
  const { title, content, mood } = req.body;
  const text = 'INSERT INTO moodjournalentries(title, content, mood ) VALUES($1, $2, $3) RETURNING *';
  const values = ['test post', 'mentor meeting', 'example'];
  client.query(text, values,
    (err, results)=>{
      console.log(err ? err.stack : results.rows);
      res.status(201).json({status: 'success', msg: 'Entry added'});
  });
};

const updateEntry = (req, res) => {
  client.query(
    `UPDATE moodjournalentries SET "title"='check' WHERE id=${req.params.id} RETURNING *`, 
    (err, results) => {
      console.log(results.rows);
      res.status(201).json({status: 'success', msg: 'Entry has been updated'});
    });
};

const deleteEntry = (req, res) => {
  console.log(req.params.id);
  client.query(`DELETE from moodjournalentries WHERE id=${req.params.id}`,(err, results)=>{
    console.log(results.rows);
    res.status(204).json({status: 'success', msg: 'Entry has been deleted'});
  });
};


app.get('/api/moodjournal/entries', getEntries);
app.post('/api/moodjournal/entries/post', addEntry);
app.patch('/api/moodjournal/entries/:id', updateEntry);
app.delete('/api/moodjournal/entries/:id', deleteEntry);

// app
//   .route('/api/moodjournal/entries/:id')
//   .patch(updateEntry)
//   .delete(deleteEntry);

app.listen(PORT, () => {
  client.connect();
  console.log(`Listening on port ${PORT}`);
});

module.exports = {app};