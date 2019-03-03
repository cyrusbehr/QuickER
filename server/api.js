const express = require('express');
const api = express.Router();
const mongoose = require('mongoose');
const { Clinic, Hospital, User, ScrapedClinic } = require('../models/models');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');

// TODO remove the dashboardCardData array
let DashboardCardData = [
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
    waitTime: 10,
    waitUnit: 'mins',
    // TODO use google maps API to get real time walking time
    walkTime: 100,
    driveTime: 50,
    clinicName: 'Wesbrook Clinic',
    address: '2545 Birney Ave.',
    id: 1,
    active: true,
  },
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

const IncomingPatients = [
  {
    firstname: 'John',
    lastname: 'Doe',
    phone: '7783175140',
    DOB: 'Aug 15 1996',
    hospitalName: 'Saint Pauls Hospital',
  },
  {
    firstname: 'James',
    lastname: 'Dane',
    phone: '1234567890',
    DOB: 'Aug 15 1996',
    hospitalName: 'Saint Pauls Hospital',
  },
  {
    firstname: 'Mesi',
    lastname: 'Mope',
    phone: '6047204608',
    DOB: 'Aug 15 1996',
    hospitalName: 'VGH',
  },
];

const AcceptedPatients = [
  {
    firstname: 'John',
    lastname: 'Doe',
    phone: '7783175140',
    DOB: 'Aug 15 1996',
    hospitalName: 'Saint Pauls Hospital',
  },
  {
    firstname: 'James',
    lastname: 'Dane',
    phone: '1234567890',
    DOB: 'Aug 15 1996',
    hospitalName: 'Saint Pauls Hospital',
  },
  {
    firstname: 'Mesi',
    lastname: 'Mope',
    phone: '6047204608',
    DOB: 'Aug 15 1996',
    hospitalName: 'VGH',
  },
];

api.get('/patientRequests', (req, res) => {
  res.json({
    error: null,
    response: {
      incomingRequests: IncomingPatients,
      acceptedRequests: AcceptedPatients,
    },
  });
});

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
  console.log(DashboardCardData);
  /*
  add more clinics to DashboardCardData manually so you have data to sort. manually change the parameters of interest
  sort the DashboardCardData

  once you get that working, then you can worry about doing it with database data

  console.log(DashboardCardData) --> is going to print to your terminal
  any time you make changes to backend code, you need to restart the dev server for the changes to take effect
  ctr c, then run 'npm run start' (remember to have source env.sh) 
  /*

  /*
  ScrapedClinic.find({hasRegistered: true}).then(clinics => {
    // clinics is an array of clinic objects
    Hospital.findById(req.body.id).then(hospital => {
      // Now we have our hospital

      // Now we need to do google maps calls here

      // sorting here ANDREW'S ALGORITHM!!

      // send response here aka res.json...
    })
  })


  /*
   Andrew your code goes here
  1) query mongodb and obtain all the clinics that are regsitered --> check the isRegsitered flag (hint I do something similar)
  ScrapedClinic.find({ hasRegistered: true }).then(clinics => {
  2) create a google API account --> need to put credit card, so be sure to set limits for request
    --> put API key into env.sh variable
  3) use the address from each clinic and call the google API to get the walk and drive time
  --> endpoint is clinic address which you have in the clinics array object, you will recieve an id in the req parameters which you can
  access via req.body.id
  Hospital.findById(req.body.id).then(foundHospital => {
    address --> foundHospital.address
  }
  })
  now at this point we have unsorted array of clinic objects, we also have our hospital, we 
  have all the wait times, distances
  
  ANDREWS ALGORITHM HERE

  res.json({
    error: null,
    response: sortedArrayOfClinicObjects
  })
    */

  res.json({
    error: null,
    response: {
      dashboardCardData: DashboardCardData,
    },
  });
});

module.exports = {
  api,
};
