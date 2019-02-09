const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Clinic, Hospital, User } = require('../models/models');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');

module.exports = passport => {
  // username, password, clinicName, address
  // List of clinics which can be registered is shows from those which are in the existing scraped database

  router.post('/login/clinic', (req, res) => {
    res.json({
      error: null,
      response: 'Success',
    });
  });

  router.post('/login/hospital', (req, res) => {
    res.json({
      error: null,
      response: 'Success',
    });
  });

  router.post(
    '/register/clinic',
    [
      check('username')
        .isLength({ min: 1 })
        .withMessage('Username is required.'),
      check('password')
        .isLength({ min: 1 })
        .withMessage('Password is required'),
      check('clinicName')
        .isLength({ min: 1 })
        .withMessage('Name is required'),
      check('address')
        .isLength({ min: 1 })
        .withMessage('Address is required'),
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      User.findOne({ username: req.body.username })
        .then(foundClinic => {
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

            // 1) Search through the scraped clinics to find the one with the matching name
            // 2) Change the hasRegistered flag to true
            // 3) Copy the clinic name, wait time, address from req to the new Clinic collection
            // 4) Create a new User, link the userReference to the new Clinic

            let User = new User({
              username: req.body.username,
              password: hash,
              usertype: 'clinic',
              userReference: null, // TODO need to put it here
            });

            return User.save();
          }
        })
        .then(savedUser => {
          // todo we need to do a login on passport here
          res.json({
            error: null,
            respone: savedUser,
          });
        })
        .catch(error => {
          console.log('error', error);
          res.json({
            error,
          });
        });
    },
  );

  return router;
};
