const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Clinic, Hospital, User, ScrapedClinic } = require('../models/models');
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
      check('passwordRepeat')
        .isLength({ min: 1 })
        .withMessage('Password Repeat is required'),
      check('clinicName')
        .isLength({ min: 1 })
        .withMessage('Name is required'),
      check('address')
        .isLength({ min: 1 })
        .withMessage('Address is required'),
      check('phone')
        .isLength({ min: 1 })
        .withMessage('Phone is required'),
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      // Check to see if we have already registered a user with that name.
      User.findOne({ username: req.body.username })
        .then(foundClinic => {
          console.log('Found User: ', foundClinic);
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
            // 2) Change the hasRegistered flag to true, set the address if it has been changed
            // 3) Create a new User, link the userReference to the new Clinic

            // Search through scraped clinic to find one with matching name. Change the hasRegistered flag to true

            ScrapedClinic.findById(req.body.id)
              .then(scrapedClinic => {
                console.log('Scraped Clinic: ', scrapedClinic);
                // If it has already been reigstered, send a warning back
                if (scrapedClinic.hasRegistered) {
                  res.json({
                    response: null,
                    error: 'Clinic has already been registered',
                  });
                }

                // Update the phone number, address, and set the has registered bool to true
                const newData = {
                  address: req.body.address,
                  hasRegistered: true,
                  phone: req.body.phone.toString(),
                };

                return ScrapedClinic.findByIdAndUpdate(req.body.id, newData);
              })
              .then(clinic => {
                console.log('Updated Clinic: ', clinic);
                // Create a new user and attach the clinic ID
                const NewUser = new User({
                  username: req.body.username,
                  password: hash,
                  usertype: 'clinic',
                  userReference: clinic._id,
                });
                return NewUser.save();
              })
              .then(savedUser => {
                console.log('Saved user: ', savedUser);

                req.login(savedUser, err => {
                  if (err) {
                    console.log(
                      'Error in logging in user after registration',
                      err,
                    );
                    res.json({
                      error: [
                        {
                          param: 'email',
                          msg: 'Error in logging in user after registration',
                        },
                      ],
                    });
                  } else {
                    res.json({
                      // TODO we DO NOT want to send savedUser here b/c it contains the password, but can send back the userID
                      error: null,
                      respone: savedUser,
                    });
                  }
                });
              })
              .catch(error => {
                console.log('error', error);
                res.json({
                  error,
                });
              });
          }
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
