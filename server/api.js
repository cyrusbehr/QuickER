const express = require('express');
const api = express.Router();
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');
const axios = require('axios');

const { Hospital, User, ScrapedClinic, Patient } = require('../models/models');

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
    id: '5c84562e1e38047192d19724',
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
    id: '5c84562e1e38047192d19724',
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
    id: '5c84562e1e38047192d19724',
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
    id: '5c84562e1e38047192d19724',
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
    id: '5c84562e1e38047192d19724',
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
    // Get the lattitude longitude of the hospital
    Hospital.findById(req.user.userReference).then(hospital => {
      const startCoordinates = {
        lattitude: hospital.lattitude,
        longitude: hospital.longitude,
      };

      const bingToken = process.env.BING_TOKEN;

      const endCoordinates = clinics.map(clinic => {
        return {
          latitude: clinic.lattitude,
          longitude: clinic.longitude,
        };
      });

      const queryString = `https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?key=${bingToken}`;
      const postBody = {
        origins: [
          {
            latitude: startCoordinates.lattitude,
            longitude: startCoordinates.longitude,
          },
        ],
        destinations: endCoordinates,
        travelMode: 'driving',
      };
      axios
        .post(queryString, postBody)
        .then(response => {
          const driveTimeArr = response.data.resourceSets[0].resources[0].results.map(
            des => des.travelDuration,
          );
          return driveTimeArr;
        })
        .then(driveTimeArr => {
          postBody.travelMode = 'walking';
          axios
            .post(queryString, postBody)
            .then(response => {
              const walkTimeArr = response.data.resourceSets[0].resources[0].results.map(
                des => des.travelDuration,
              );

              const travelTimeArr = [];
              for (let i = 0; i < clinics.length; i += 1) {
                travelTimeArr.push({
                  driveTime: driveTimeArr[i],
                  walkTime: walkTimeArr[i],
                });
              }
              return travelTimeArr;
            })
            .then(travelTimeArr => {
              const clinicWithTravelTime = clinics.map((clin, idx) => {
                const notActive =
                  clin.waitTime === 'At Capacity' ||
                  clin.waitTime === 'Walk-in Closed' ||
                  clin.waitTime === 'Reopening';
                const active = !notActive;
                const waitTime = active
                  ? clin.waitTime.split(' ')
                  : clin.waitTime;
                return {
                  driveTime: parseInt(travelTimeArr[idx].driveTime, 10),
                  walkTime: parseInt(travelTimeArr[idx].walkTime, 10),
                  clinicName: clin.name,
                  waitTime: active ? waitTime[0] : waitTime,
                  waitUnit: active ? waitTime[1] : waitTime,
                  address: clin.address,
                  phone: clin.phone,
                  active,
                };
              });

              const sortedClinics = clinicWithTravelTime.map(c => {
                // calculate weighted score, lower scores are better
                c.score = c.waitTime * 0.1 * 0.8 + c.walkTime * 0.5;
                return c;
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
        });
    });
  });
});

module.exports = {
  api,
};
