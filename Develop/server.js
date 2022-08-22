const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const uuid = require('./helpers/uuid');
const notesData = require('./db/db.json');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

  const readFromFile = util.promisify(fs.readFile);

  app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received to get notes`)
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const { title, text } = req.body;
    res.json(notesData);

    if (title && text) {
        // Variable for the object we will save
        const newNote = {
          title,
          text,
          id: uuid(),
        };
    
        // Obtain existing notes
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
            console.error(err);
            } else {
            // Convert string into JSON object
            const parsedNotes = JSON.parse(data);

            // Add a new note
            parsedNotes.push(newNote);

            // Write updated notes back to the file
            fs.writeFile(
                './db/db.json',
                JSON.stringify(parsedNotes, null, 4),
                (writeErr) =>
                writeErr
                    ? console.error(writeErr)
                    : console.info('Successfully updated notes!')
            );
            }
        });

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting note');
    }
  });

    app.delete(`/api/notes/:id`, (req, res) => {

    })

  app.listen(PORT, () => {
    console.log(`NoteTaker App listening at http://localhost:${PORT}`);
  });
