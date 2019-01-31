const express = require('express');
const api = express();
const mongoose = require('mongoose');
const { Clinic, Hospital } = require('../models/models');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');

api.post('/queuepatient', (req, res) => {
  res.json({
    error: null,
    response: 'success',
  });
});

api.post(
  '/registerClinic',
  [
    check('username')
      .isLength({ min: 1 })
      .withMessage('Username is required.'),
    check('password')
      .isLength({ min: 1 })
      .withMessage('Password is required'),
    check('clinicName')
      .isLength({ min: 1 })
      .withMessage('Clinic Name is required'),
    check('address')
      .isLength({ min: 1 })
      .withMessage('Address is required'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    Clinic.findOne({ username: req.body.username })
      .then(function(foundClinic) {
        if (foundClinic) {
          throw [
            {
              param: 'username',
              msg: 'Username is taken',
            },
          ];
        } else {
          const saltRounds = 10;
          const hash = bcrypt.hashSync(req.body.password, saltRounds);

          let clinic = new Clinic({
            clinicName: req.body.clinicName,
            username: req.body.username,
            address: req.body.address,
            waitTime: -1,
            password: hash,
          });

          return clinic.save();
        }
      })
      .then(function(savedClinic) {
        // todo we need to do a login on passport here
        res.json({
          error: null,
          respone: savedClinic,
        });
      })
      .catch(function(error) {
        console.log('error', error);
        res.json({
          error: error,
        });
      });
  },
);

module.exports = {
  api,
};
