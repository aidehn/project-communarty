const express = require('express');
const cors = require('cors');

const router = require('./router');
const app = express();

app.use(express.json());
app.use(cors());
app.use('/', router);

app.listen(3005, () => {
  console.log('Listening on Port 3005 🚀');
});
