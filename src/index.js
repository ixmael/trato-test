require('module-alias/register');
require('dotenv').config();

const path = require('path');
const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(express.json());

// Expose API REST
app.use('/api', require("@api"));

// Show home section
app.use(express.static('public'));
app.use('/', (req,res) => {
  res.sendFile(path.resolve('public', 'index.html'));
});

app.listen(
  process.env.APP_PORT,
  () => console.log(`You can visit ${process.env.APP_PORT}!`)
);
