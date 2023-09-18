require('dotenv').config();
const express = require('express');
const path = require('path');
const router = require('./router');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/', router);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
