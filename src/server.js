// const app = require('./app');
// const { PORT } = require('./config');

// ** BEGIN MOOD-JOURNAL-CAPSTONE SERVER ** //

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { pool } = require('./config');

const app = express();

const PORT = process.env.PORT || 3000;
const {CLIENT_ORIGIN} = require('./config');

// app.get('/api/*', (req, res) => {
//   res.json({ok: true});
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

const getEntries = (req, res) => {
  pool.query('SELECT * FROM moodjournalentries', (error, response) => {
    // if (error) {
    //   throw error;
    // }
    res.status(200).json(res.rows);
  });
};

const addEntry = (req, res) => {
  const { title, content, mood } = req.body;

  pool.query('INSERT INTO moodjournalentries (title, content, mood) VALUES ($1, $2, $3)' [title, content, mood], error => {
    // if (error) {
    //   throw error;
    // }
    res.status(201).json({status: 'success', msg: 'Entry added'});
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