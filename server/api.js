const express = require('express');
const api = express.Router();
const mongoose = require('mongoose');
const {
  Clinic,
  Hospital,
  User,
  ScrapedClinic,
  Patient,
} = require('../models/models');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');

// TODO remove the dashboardCardData array
const DashboardCardData = [
  {
    waitTime: 60,
    waitUnit: 'mins',
    // TODO use bing maps API to get real time walking time
    walkTime: 12,
    driveTime: 4,
    clinicName: 'Wesbrook Clinic',
    address: '2545 Birney Ave.',
    id: '5c7b6a18da53f96abc0c2e8d',
    active: true,
  },
  {
    waitTime: 70,
    waitUnit: 'mins',
    // TODO use bing maps API to get real time walking time
    walkTime: 12,
    driveTime: 4,
    clinicName: 'Wesbrook Clinic',
    address: '2545 Birney Ave.',
    id: '5c7b6a18da53f96abc0c2e8d',
    active: true,
  },
  {
    waitTime: 80,
    waitUnit: 'mins',
    // TODO use bing maps API to get real time walking time
    walkTime: 12,
    driveTime: 4,
    clinicName: 'Wesbrook Clinic',
    address: '2545 Birney Ave.',
    id: '5c7b6a18da53f96abc0c2e8d',
    active: true,
  },
  {
    waitTime: 90,
    waitUnit: 'mins',
    // TODO use bing maps API to get real time walking time
    walkTime: 12,
    driveTime: 4,
    clinicName: 'Wesbrook Clinic',
    address: '2545 Birney Ave.',
    id: '5c7b6a18da53f96abc0c2e8d',
    active: true,
  },
  {
    waitTime: 100,
    waitUnit: 'mins',
    // TODO use bing maps API to get real time walking time
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
    // TODO use bing maps API to get real time walking time
    walkTime: 16,
    driveTime: 8,
    clinicName: 'Wesbrook Clinic',
    address: '2545 Birney Ave.',
    id: '5c7b6a18da53f96abc0c2e8d',
    active: true,
  },
  {
    waitTime: 1,
    waitUnit: 'hr',
    walkTime: 25,
    driveTime: 10,
    clinicName: 'Point Grey Clinic',
    address: '212 W Broadway',
    id: '5c7b6a18da53f96abc0c2e8d',
    active: true,
  },
  {
    waitTime: 8,
    waitUnit: 'AM',
    walkTime: 2,
    driveTime: 0,
    clinicName: 'Student Clinic',
    address: '412 Wesbrook Mall',
    id: '5c7b6a18da53f96abc0c2e8d',
    active: false,
  },
];

api.post('/incoming/delete', (req, res) => {
  Patient.findByIdAndRemove(req.body.patientId).then(() => {
    ScrapedClinic.update(
      { incomingRequests: req.body.patientId, _id: req.body.clinicId },
      { $pull: { incomingRequests: req.body.patientId } },
    ).then(() => {
      res.json({
        error: null,
        response: 'Success',
      });
    });
  });
});

api.post('/accepted/delete', (req, res) => {
  Patient.findByIdAndRemove(req.body.patientId).then(() => {
    ScrapedClinic.update(
      { acceptedRequests: req.body.patientId, _id: req.body.clinicId },
      { $pull: { acceptedRequests: req.body.patientId } },
    ).then(() => {
      res.json({
        error: null,
        response: 'Success',
      });
    });
  });
});

api.post('/incoming/accept', (req, res) => {
  ScrapedClinic.update(
    { incomingRequests: req.body.patientId, _id: req.body.clinicId },
    {
      $pull: { incomingRequests: req.body.patientId },
      $push: { acceptedRequests: req.body.patientId },
    },
  ).then(() => {
    res.json({
      error: null,
      response: '',
    });
  });
});

api.post('/accepted/accept', (req, res) => {
  ScrapedClinic.update(
    { acceptedRequests: req.body.patientId, _id: req.body.clinicId },
    {
      $pull: { acceptedRequests: req.body.patientId },
      $push: { checkedInRequests: req.body.patientId },
    },
  ).then(() => {
    res.json({
      error: null,
      response: '',
    });
  });
});

api.post('/patient', (req, res) => {
  const newPatient = new Patient({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    DOB: req.body.DOB,
    phone: req.body.phone,
    hospitalName: req.body.hospitalName,
  });
  newPatient.save().then(savedUser => {
    ScrapedClinic.update(
      { _id: req.body.clinicId },
      {
        $push: { incomingRequests: savedUser._id },
      },
    ).then(updatedClinic => {
      res.json({
        error: null,
        response: updatedClinic,
      });
    });
  });
});

api.get('/patients', (req, res) => {
  ScrapedClinic.findById(req.query.id)
    .populate('incomingRequests')
    .populate('acceptedRequests')
    .populate('checkedInRequests')
    .exec()
    .then(foundClinic => {
      if (!foundClinic) {
        return res.json({
          error: 'Unable to find clinic',
          response: null,
        });
      }

      res.json({
        error: null,
        response: {
          incomingRequests: foundClinic.incomingRequests,
          acceptedRequests: foundClinic.acceptedRequests,
          checkinRequests: foundClinic.checkedInRequests,
        },
      });
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
  ScrapedClinic.find({ hasRegistered: true }).then(clinics => {
    clinics = DashboardCardData; // / TODO remove this
    // new array with weighted scores
    const sortedClinics = clinics.map(clinic => {
      // calculate weighted score
      const score = clinic.waitTime * 0.8 + clinic.waitTime * 0.2;
      // assign key name to value
      clinic.score = score;
      return clinic;
    });

    sortedClinics.sort((a, b) => {
      if (a.score < b.score) return -1;
      if (a.score > b.score) return 1;
      return 0;
    });

    res.json({
      error: null,
      response: {
        dashboardCardData: sortedClinics,
      },
    });
  });

  // Hospital.findById(req.body.id).then(hospital => {});

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

      // Now we need to do bing maps calls here

      // sorting here ANDREW'S ALGORITHM!!

      // send response here aka res.json...
    })
  })


  /*
   Andrew your code goes here
  1) query mongodb and obtain all the clinics that are regsitered --> check the isRegsitered flag (hint I do something similar)
  ScrapedClinic.find({ hasRegistered: true }).then(clinics => {
  2) create a bing API account --> need to put credit card, so be sure to set limits for request
    --> put API key into env.sh variable
  3) use the address from each clinic and call the bing API to get the walk and drive time
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
});

module.exports = {
  api,
};
