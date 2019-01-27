const express = require('express');
const api = express();

// GET http://localhost:8080/api
api.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

module.exports = {
  api,
};
