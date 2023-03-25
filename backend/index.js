const express = require('express');
const app = express();
const port = 5000;

const cors = require('cors');
const bodyParser = require('body-parser');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  console.log(req.method, req.url);
  console.log(req.headers['content-type']);
  console.log(req.body);
  next();
});


app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));


app.listen(port, () => console.log(`Listening on port ${port}`));