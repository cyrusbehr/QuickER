const express = require('express');
const api = express.Router();
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');

const {
  Clinic,
  Hospital,
  User,
  ScrapedClinic,
  Patient,
} = require('../models/models');

// TODO remove the dashboardCardData array
const DashboardCardData = [
  {
    // base
    waitTime: 5,
    waitUnit: 'mins',
    // TODO use bing maps API to get real time walking time
    walkTime: 5,
    driveTime: 1,
    clinicName: 'University Village Medical Clinic',
    address: '2155 Allison Road, Vancouver',
    id: '5c7b6a11da53f96abc0c2e60',
    active: true,
  },
  {
    // longer walktime
    waitTime: 20,
    waitUnit: 'mins',
    // TODO use bing maps API to get real time walking time
    walkTime: 16,
    driveTime: 3,
    clinicName: 'Careville Clinic',
    address: '3317 Wesbrook Mall, Vancouver',
    id: '5c7b6a18da53f96abc0c2e8d',
    active: true,
  },
  {
    // longer waittime
    waitTime: 45,
    waitUnit: 'mins',
    // TODO use bing maps API to get real time walking time
    walkTime: 16,
    driveTime: 4,
    clinicName: 'University Village Medical Clinic - Birney Ave',
    address: '5933 Birney Ave, Vancouver',
    id: '5c7b6a18da53f96abc0c2e8d',
    active: true,
  },
  {
    // longer walktime but shorter waittime
    waitTime: 10,
    waitUnit: 'AM',
    // TODO use bing maps API to get real time walking time
    walkTime: 16,
    driveTime: 6,
    clinicName: 'Point Grey Medical Clinic',
    address: '4448 W 10th Ave, Vancouver',
    id: '1',
    active: false,
  },
  {
    // longer waittime but shorter walktime
    waitTime: 1,
    waitUnit: 'hr',
    // TODO use bing maps API to get real time walking time
    walkTime: 72,
    driveTime: 12,
    clinicName: 'Khatsahlano Medical Clinic',
    address: '2685 W Broadway, Vancouver',
    id: '5c7b6a18da53f96abc0c2e8d',
    active: true,
  },
];

api.post('/incoming/delete', (req, res) => {
  Patient.findByIdAndRemove(req.body.patientId).then(() => {
    ScrapedClinic.update(
      { _id: req.body.clinicId },
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
      { _id: req.body.clinicId },
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
    { _id: req.body.clinicId },
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
    { _id: req.body.clinicId },
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
  ScrapedClinic.find({ hasRegistered: true }).then(clinics => {
    clinics = DashboardCardData; // / TODO remove this
    // new array with weighted scores
    const sortedClinics = clinics.map(clinic => {
      // calculate weighted score, lower scores are better
      const score = clinic.waitTime * 0.1 * 0.8 + clinic.walkTime * 0.5;
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
