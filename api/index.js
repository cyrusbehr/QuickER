const express = require('express');
const router = express.router();

// GET http://localhost:8080/api
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

export default router;
