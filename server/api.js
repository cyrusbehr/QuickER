const express = require('express');
const api = express();
const mongoose = require('mongoose');
const { Clinic, Hospital } = require('../models/models');
const { check, validationResult } = require('express-validator/check');

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
    return res.json({ message: 'it worked!' });
  },
);

module.exports = {
  api,
};
