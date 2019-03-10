const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

const ScrapedClinicSchema = mongoose.Schema({
  waitTime: String,
  name: String,
  address: String,
  hasRegistered: Boolean,
  phone: String,
  lattitude: Number,
  longitude: Number,
  incomingRequests: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Patient',
    },
  ],
  acceptedRequests: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Patient',
    },
  ],
  checkedInRequests: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Patient',
    },
  ],
});

const PatientSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  DOB: String,
  phone: String,
  hospitalName: String,
});

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  usertype: String,
  userReference: mongoose.Schema.ObjectId,
});

const HospitalSchema = mongoose.Schema({
  hospitalName: String,
  address: String,
  lattitude: Number,
  longitude: Number,
});

const Patient = mongoose.model('Patient', PatientSchema);
const Hospital = mongoose.model('Hospital', HospitalSchema);
const User = mongoose.model('User', UserSchema);
const ScrapedClinic = mongoose.model(
  'ScrapedClinic',
  ScrapedClinicSchema,
  'ScrapedClinic',
);

module.exports = {
  Hospital,
  User,
  ScrapedClinic,
  Patient,
};
