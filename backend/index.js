// import express and start node server on port 5000

const express = require('express');
const app = express();
const port = 5000;

// import cors and body-parser

const cors = require('cors');
const bodyParser = require('body-parser');


// listen on port 5000
app.listen(port, () => console.log(`Listening on port ${port}`));