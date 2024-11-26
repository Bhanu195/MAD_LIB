const express = require('express'); // Import Express
const logger = require('morgan'); // Import Morgan for logging
const path = require('path'); // Import Path module for handling file paths

const server = express(); // Create an Express app instance

// Middleware
server.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
server.use(logger('dev')); // Use Morgan for logging

// Serve static files from the 'public' directory
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));


// Route to generate a random number
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});



// POST Route for Mad Lib
server.post('/ITC505/lab-7/index.html', (req, res) => {
  const { noun, pluralNoun, adjective, verb, location } = req.body;

  if (!noun || !pluralNoun || !adjective || !verb || !location) {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mad Lib Error</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
            background-color: #f8d7da;
            color: #721c24;
          }
          h1 {
            font-size: 2rem;
          }
          p {
            margin: 20px 0;
          }
          a {
            color: #0056b3;
            text-decoration: none;
            font-weight: bold;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <h1>Submission Failed</h1>
        <p>Please fill out ALL fields</p>
        <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
      </body>
      </html>
    `);
    return;
  }

  const madLib = `Once upon a time, in a ${location}, a ${adjective} ${noun} decided to ${verb}. 
  To its surprise, a group of ${pluralNoun} joined the adventure!`;

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Mad Lib</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #f4f4f4;
          color: #333;
          text-align: center;
        }
        h1 {
          font-size: 2.5rem;
          color: #4CAF50;
        }
        p {
          font-size: 1.5rem;
          margin: 20px 0;
          line-height: 1.6;
        }
        a {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 20px;
          font-size: 1rem;
          font-weight: bold;
          color: white;
          background-color: #007BFF;
          text-decoration: none;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }
        a:hover {
          background-color: #0056b3;
        }
      </style>
    </head>
    <body>
      <h1>Your Mad Lib!</h1>
      <p>${madLib}</p>
      <a href="/ITC505/lab-7/index.html">Create Another Mad Lib</a>
    </body>
    </html>
  `);
});

// Start the server
let port = 80; // Default port
if (process.argv[2] === 'local') {
  port = 8080; // Use port 8080 for local development
}
server.listen(port, () => console.log(`Ready on localhost:${port}`));
