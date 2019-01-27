/*
 *
 * HospitalDashboardContainer constants
 *
 */

const DashboardCardData = [
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

const DEFAULT_ACTION = 'app/HospitalDashboardContainer/DEFAULT_ACTION';
module.exports = {
  DashboardCardData,
  DEFAULT_ACTION,
};
