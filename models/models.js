const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

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

const ClinicSchema = mongoose.Schema({
  clinicName: String,
  address: String,
  waitTime: Number,
});

const HospitalSchema = mongoose.Schema({
  hospitalName: String,
  address: String,
});

const Clinic = mongoose.model('Clinic', ClinicSchema);
const Hospital = mongoose.model('Hospital', HospitalSchema);
const User = mongoose.model('User', UserSchema);

module.exports = {
  Clinic,
  Hospital,
};
