const express = require('express');
const api = express.Router();
const mongoose = require('mongoose');
const { Clinic, Hospital, User } = require('../models/models');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');

api.post('/queuepatient', (req, res) => {
  res.json({
    error: null,
    response: 'success',
  });
});

module.exports = {
  api,
};
