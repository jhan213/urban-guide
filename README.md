# Note Taker App

## Description

The Note Taker App is a website that allows its users to create and manage notes.
Link: [https://rocky-balboa-note-app.herokuapp.com/](https://rocky-balboa-note-app.herokuapp.com/)

## Table of Contents

If your README is long, add a table of contents to make it easy for users to find what they need.

- [Usage](#usage)
- [Credits](#credits)
- [Features & Components](#license)

## Usage

![](./public/assets/css/notetaker_app_preview.png)

## Credits

UCLA Extension Full-Stack Coding Bootcamp

## Features & Components

* To add a note: Begin typing in an empty note pane
* To delete a note: Click on the trash can icon
* To save a note: Save by clicking on save icon
* To manage notes: Click on existing notes in left hand column

The notes database is hosted locally on Heroku in a JSON file.
ExpressJS builds the website. It creates routes to the HTML files, creates API routes (GET, POST, DELETE) and defines each route's functions.
The functions are the following:
* GET: Gets all notes from the database
* POST: Adds note to the database
* DELETE: Deletes note in the database with id
The `index.js` file in `public` implements API calls to display and manage notes in the frontend.