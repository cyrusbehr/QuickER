const express = require('express');
const api = express.Router();
const mongoose = require('mongoose');
const { Clinic, Hospital, User, ScrapedClinic } = require('../models/models');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');

api.post('/queuepatient', (req, res) => {
  res.json({
    error: null,
    response: 'success',
  });
});

api.get('/scrapedclinics', (req, res) => {
  // Connect to the ScrapedClinic db and obtain all the clinics which have the hasRegistered flag set to false
  // return array of clinics
  ScrapedClinic.find({ hasRegistered: false }).then(clinics => {
    clinics.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    res.json({
      error: null,
      response: clinics,
    });
  });
});

module.exports = {
  api,
};
