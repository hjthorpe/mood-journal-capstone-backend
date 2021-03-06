// ** BEGIN MOOD-JOURNAL-CAPSTONE SERVER ** //

const express = require('express');
const nodemon = require('nodemon');
const bodyParser = require('body-parser');
const cors = require('cors');
const { client } = require('./config');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
const {CLIENT_ORIGIN} = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const getEntries = (req, res) => {
  client.query('SELECT * from moodjournalentries', (err, results) => {
    res.status(200).json(results.rows);
  });

};

const addEntry = (req, res) => {
  const { title, content, mood } = req.body;
  const text = `INSERT INTO moodjournalentries("title", "content", "mood" ) VALUES('${title}', '${content}', '${mood}') RETURNING *`;
  client.query(text,
    (err, results)=>{
      res.status(201).json({status: 'success', msg: 'Entry added'});
    });
};

const updateEntry = (req, res) => {
  const { title, content, mood } = req.body;
  client.query(
    `UPDATE moodjournalentries SET "title"='${title}', "content"='${content}', "mood"='${mood}'  WHERE id=${req.params.id} RETURNING *`, 
    (err, results) => {
      console.log(err, results);
      res.status(201).json({status: 'success', msg: 'Entry has been updated'});
    });
};

const deleteEntry = (req, res) => {
  client.query(`DELETE from moodjournalentries WHERE "id"='${req.params.id}'`,(err, results)=>{
    res.status(204).json({status: 'success', msg: 'Entry has been deleted'});
  });
};


app.get('/api/moodjournal/entries', getEntries);
app.post('/api/moodjournal/entries/post', addEntry);
app.patch('/api/moodjournal/entries/:id', updateEntry);
app.delete('/api/moodjournal/entries/:id', deleteEntry);


app.listen(PORT, () => {
  client.connect();
  console.log(`Listening on port ${PORT}`);
});

module.exports = {app};