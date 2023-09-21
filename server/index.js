require('dotenv').config();
const express = require('express');
const path = require('path');
const router = require('./router');

const clientBuild = path.join(__dirname, '../client/dist');
const app = express();
app.use(express.json());
app.use(express.static(clientBuild));

app.use('/feedback', (req, res) => {
  res.sendFile(`${clientBuild}/index.html`);
});

app.use('/editor/*', (req, res) => {
  res.sendFile(`${clientBuild}/index.html`);
});

app.use('/problemspage', (req, res) => {
  res.sendFile(`${clientBuild}/index.html`);
});

app.use('/profile', (req, res) => {
  res.sendFile(`${clientBuild}/index.html`);
});

app.use('/api', router);

const { PORT } = process.env;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Listening at http://0.0.0.0:${PORT}`);
});
