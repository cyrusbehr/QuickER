const express = require('express');
const api = express();
const mongoose = require('mongoose');
const { Clinic, Hospital } = require('../models/models');

api.post('/registerClinic', function(req, res) {});

module.exports = {
  api,
};
