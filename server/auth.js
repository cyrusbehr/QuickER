const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Clinic, Hospital, User, ScrapedClinic } = require('../models/models');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');

module.exports = passport => {
  router.get('/checklogin/clinic', (req, res) => {
    if (req.user && req.user.usertype === 'clinic') {
      ScrapedClinic.findById(req.user.userReference).then(clinic => {
        res.json({
          loggedIn: true,
          user: {
            usertype: req.user.usertype,
            userReference: req.user.userReference,
            id: req.user._id,
          },
          name: clinic.name,
        });
      });
    } else {
      res.json({
        loggedIn: false,
        user: null,
      });
    }
  });

  router.get('/checklogin/hospital', (req, res) => {
    if (req.user && req.user.usertype === 'hospital') {
      Hospital.findById(req.user.userReference).then(hospital => {
        res.json({
          loggedIn: true,
          user: {
            usertype: req.user.usertype,
            userReference: req.user.userReference,
            id: req.user._id,
          },
          hospitalName: hospital.hospitalName,
        });
      });
    } else {
      res.json({
        loggedIn: false,
        user: null,
      });
    }
  });

  router.post(
    '/login/clinic',
    passport.authenticate('local', {
      failureRedirect: '/login/clinic/failure',
    }),
    (req, res) => {
      res.json({
        error: null,
        response: {
          usertype: req.user.usertype,
          userReference: req.user.userReference,
          id: req.user._id,
        },
      });
    },
  );

  router.get('/login/clinic/failure', (req, res) => {
    res.json({
      error: 'Incorrect username or password',
    });
  });

  router.post(
    '/login/hospital',
    passport.authenticate('local', {
      failureRedirect: '/login/hospital/failure',
    }),
    (req, res) => {
      res.json({
        error: null,
        response: {
          usertype: req.user.usertype,
          userReference: req.user.userReference,
          id: req.user._id,
        },
      });
    },
  );

  router.get('/login/hospital/failure', (req, res) => {
    res.json({
      error: 'Incorrect username or password',
    });
  });

  // This backend route should only be hit by postman
  // Only allow authorized users to register a new hospital
  // Must provide token in env.sh to verify root access
  router.post(
    '/register/hospital',
    [
      check('username')
        .isLength({ min: 1 })
        .withMessage('Username'),
      check('password')
        .isLength({ min: 1 })
        .withMessage('Password'),
      check('hospitalName')
        .isLength({ min: 1 })
        .withMessage('Hospital Name'),
      check('address')
        .isLength({ min: 1 })
        .withMessage('Clinic Address'),
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({
          errors: errors.array(),
          response: null,
        });
      }

      if (req.body.token !== process.env.AUTH_TOKEN) {
        return res.json({
          error: 'Incorrect authentication token provided',
          response: null,
        });
      }

      User.findOne({ username: req.body.username }).then(foundUser => {
        if (foundUser) {
          return res.json({
            error: 'Username already takend',
            response: null,
          });
        }
        const NewHospital = new Hospital({
          hospitalName: req.body.hospitalName,
          address: req.body.address,
        });

        NewHospital.save()
          .then(savedHospital => {
            const saltRounds = 10;
            const hash = bcrypt.hashSync(req.body.password, saltRounds);
            const usertype = 'hospital';

            const newUser = new User({
              username: req.body.username,
              password: hash,
              usertype,
              userReference: savedHospital._id,
            });

            return newUser.save();
          })
          .then(savedUser => {
            res.json({
              error: null,
              respone: {
                usertype: savedUser.usertype,
                userReference: savedUser.userReference,
                id: savedUser._id,
              },
            });
          });
      });
    },
  );

  router.post(
    '/register/clinic',
    [
      check('username')
        .isLength({ min: 1 })
        .withMessage('Username'),
      check('password')
        .isLength({ min: 1 })
        .withMessage('Password'),
      check('passwordRepeat')
        .isLength({ min: 1 })
        .withMessage('Password Repeat'),
      check('clinicName')
        .isLength({ min: 1 })
        .withMessage('Clinic Name'),
      check('address')
        .isLength({ min: 1 })
        .withMessage('Clinic Address'),
      check('phone')
        .isLength({ min: 1 })
        .withMessage('Clinic Phone'),
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({
          errors: errors.array(),
          response: null,
        });
      }

      if (req.body.password !== req.body.passwordRepeat) {
        res.json({
          response: null,
          error: 'Password does not match',
        });
      }

      // Check to see if we have already registered a user with that name.
      User.findOne({ username: req.body.username })
        .then(foundClinic => {
          console.log('Found User: ', foundClinic);
          if (foundClinic) {
            res.json({
              error: 'Username is already taken',
              response: null,
            });
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
                    console.log('req.user: ', req.user);
                    res.json({
                      // TODO we DO NOT want to send savedUser here b/c it contains the password, but can send back the userID
                      error: null,
                      respone: {
                        usertype: savedUser.usertype,
                        userReference: savedUser.userReference,
                        id: savedUser._id,
                      },
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
