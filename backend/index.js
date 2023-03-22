// import express and start node server on port 5000

const express = require('express');
const db = require('./models');
const app = express();
const port = 5000;

// import cors and body-parser

const cors = require('cors');
const bodyParser = require('body-parser');

// import routes
const routes = require('./routes/signup');
app.use("/signup", routes);

// listen on port 5000
db.sequelize.sync().then(() => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
});