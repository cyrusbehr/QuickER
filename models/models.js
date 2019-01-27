const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const ClinicSchema = mongoose.Schema({
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
  clinicName: String,
  address: String,
  waitTime: Number,
});

const HospitalSchema = mongoose.Schema({
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
  hospitalName: String,
  address: String,
});

const Clinic = mongoose.model('Clinic', ClinicSchema);
const Hospital = mongoose.model('Hospital', HospitalSchema);

module.exports = {
  Clinic,
  Hospital,
};
