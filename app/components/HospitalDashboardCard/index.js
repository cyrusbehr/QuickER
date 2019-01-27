/**
 *
 * HospitalDashboardCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class HospitalDashboardCard extends React.Component {
  getWaitTimeContent = () => {
    if (this.props.active) {
      return (
        <React.Fragment>
          <span className="waitTimeStr">
            {'~'.concat(this.props.waitTime.toString(10))}
          </span>
          <span className="waitUnitStr">
            {this.props.waitUnit}
            <br />
            wait
          </span>
        </React.Fragment>
      );
    }
    return (
      <span className="closedCardWaitTimeStr">
        Opens {this.props.waitTime.toString(10)} {this.props.waitUnit}
      </span>
    );
  };

  render() {
    return (
      <div className="hospitalDashCards">
        <div className="waitTime boxShadowEffect">
          <span className="center">
            <i className="material-icons hospitalDashIconLarge">access_time</i>
            {this.getWaitTimeContent()}
          </span>
        </div>
        <div className="commuteTimeCont">
          <div className="center boxShadowEffect commuteTime commuteTimeLeft">
            <i className="material-icons hospitalDashIconSmall">
              directions_walk
            </i>
            <span className="waitTimeStrSmall">
              {this.props.walkTime.toString(10)}
            </span>
            <span className="waitUnitStrSmall">
              <div>mins</div>
              <div>walk</div>
            </span>
          </div>
          <div className="boxShadowEffect commuteTime commuteTimeRight">
            <i className="material-icons hospitalDashIconSmall">
              directions_car
            </i>
          </div>
        </div>
        <div>address here</div>
        <div>
          add to queue <button type="button">queue</button>
        </div>
      </div>
    );
  }
}

HospitalDashboardCard.propTypes = {
  waitUnit: PropTypes.string,
  active: PropTypes.bool,
  waitTime: PropTypes.number,
  walkTime: PropTypes.number,
};

export default HospitalDashboardCard;
