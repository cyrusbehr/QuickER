const express = require('express');
const api = express.Router();
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');
const axios = require('axios');
const accountSid = 'ACe275517637075b7fb777f44f7b549efc';
const authToken = process.env.TWILIO_TOKEN;
const twilioClient = require('twilio')(accountSid, authToken);

const { Hospital, User, ScrapedClinic, Patient } = require('../models/models');

api.post('/incoming/delete', (req, res) => {
  Patient.findById(req.body.patientId).then(patient => {
    Patient.findByIdAndRemove(req.body.patientId).then(() => {
      ScrapedClinic.update(
        { _id: req.body.clinicId },
        { $pull: { incomingRequests: req.body.patientId } },
      ).then(() => {
        if (patient.phone && patient.phone.length) {
          let clientNumber = patient.phone;
          if (clientNumber.length === 10) {
            clientNumber = `1${clientNumber}`;
          }
          clientNumber = `+${clientNumber}`;
          twilioClient.messages
            .create({
              body: `Your request was not approved by the clinic. Please try another walk in clinic`,
              to: clientNumber,
              messagingServiceSid: 'MG2df860e11a20b54a5deca683e7e83a01',
            })
            .then(message => {
              console.log(message);
            });
        }
        res.json({
          error: null,
          response: 'Success',
        });
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
    Patient.findById(req.body.patientId).then(patient => {
      if (patient.phone && patient.phone.length) {
        ScrapedClinic.findById(req.body.clinicId).then(clin => {
          let clientNumber = patient.phone;
          if (clientNumber.length === 10) {
            clientNumber = `1${clientNumber}`;
          }
          clientNumber = `+${clientNumber}`;
          twilioClient.messages
            .create({
              body: `You have succesfully been added to the ${
                clin.name
              } queue. Your esimated wait time is ${clin.waitTime}`,
              to: clientNumber,
              messagingServiceSid: 'MG2df860e11a20b54a5deca683e7e83a01',
            })
            .then(message => {
              console.log(message);
            });
        });
      }
      res.json({
        error: null,
        response: '',
      });
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
                  id: clin._id,
                  active,
                };
              });

              const sortedClinics = clinicWithTravelTime.map(c => {
                // calculate weighted score, lower scores are better
                if (!c.active) {
                  c.score = Number.MAX_SAFE_INTEGER;
                } else {
                  // Wait time is string, convert to float
                  c.score =
                    parseFloat(c.waitTime) * 0.1 * 0.8 + c.walkTime * 0.5;
                }
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
