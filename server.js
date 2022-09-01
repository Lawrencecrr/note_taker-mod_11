const express = require('express');
const path = require('path');
const fs = require('fs')
const PORT = process.env.port || 3001;
const app = express();
// const apiRoutes = require('./routes/index.js')

const tips = require('express').Router();
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', apiRoutes);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// get route for note
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  // POST Route for a new UX/UI tip
app.post('/api/notes', (req, res) => {
    console.log(req.body);
  
    const { text, title } = req.body;
  
    if (req.body) {
      const newTip = {
        text,
        title,
        tip_id: uuidv4(),
      };
  
      readAndAppend(newTip, './db/db.json');
      res.json(`Tip added successfully 🚀`);
    } else {
      res.error('Error in adding tip');
    }
  });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

