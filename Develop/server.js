const express = require('express');
const fs = require('fs');
const path = require('path');
const notesData = require('./db/db.json');
const PORT = 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
  });

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => res.status(200).json(notesData));

app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);
    fs.readFile('./db/db.json', function (err, data) {
        var json = JSON.parse(data)
        json.push(req.body)
        fs.writeFile("./db/db.json", JSON.stringify(json), err =>{
            if(err) console.log(err)
        })
    })
    const response = {
        status: 'success',
        body: req.body,
      };
  
      res.status(201).json(response);
    
    // // Destructuring assignment for the items in req.body
    // const { product, review, username } = req.body;
  
    // // If all the required properties are present
    // if (product && review && username) {
    //   // Variable for the object we will save
    //   const newReview = {
    //     product,
    //     review,
    //     username,
    //     upvotes: Math.floor(Math.random() * 100),
    //     review_id: uuid(),
    //   };
  
    //   const response = {
    //     status: 'success',
    //     body: newReview,
    //   };
  
    //   console.log(response);
    //   res.status(201).json(response);
    // } else {
    //   res.status(500).json('Error in posting review');
    // }
  });

  app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });