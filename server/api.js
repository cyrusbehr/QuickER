const express = require('express');
const api = express.Router();
const mongoose = require('mongoose');
const { Clinic, Hospital, User, ScrapedClinic } = require('../models/models');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');

// TODO remove the dashboardCardData array
const DashboardCardData = [
  {
    waitTime: 60,
    waitUnit: 'mins',
    // TODO use google maps API to get real time walking time
    walkTime: 12,
    driveTime: 4,
    clinicName: 'Wesbrook Clinic',
    address: '2545 Birney Ave.',
    id: 1,
    active: true,
  },
  {
    waitTime: 1,
    waitUnit: 'hr',
    walkTime: 25,
    driveTime: 10,
    clinicName: 'Point Grey Clinic',
    address: '212 W Broadway',
    id: 2,
    active: true,
  },
  {
    waitTime: 8,
    waitUnit: 'AM',
    walkTime: 2,
    driveTime: 0,
    clinicName: 'Student Clinic',
    address: '412 Wesbrook Mall',
    id: 3,
    active: false,
  },
];

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

api.get('/clinics', (req, res) => {
  res.json({
    response: {
      dashboardCardData: DashboardCardData,
    },
  });
});

module.exports = {
  api,
};
