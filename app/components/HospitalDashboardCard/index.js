/**
 *
 * HospitalDashboardCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

/* eslint-disable react/prefer-stateless-function */
class HospitalDashboardCard extends React.Component {
  getQueueContent = () => {
    if (this.props.active) {
      return (
        <div className="addToQueue center">
          <span className="addToQueueTxt">add to queue</span>
          <Fab color="default" type="button" onClick={this.onPress}>
            <Icon className="icon-color">navigate_next</Icon>
          </Fab>
        </div>
      );
    }
    return (
      <div className="closed align-text-center center">
        <span className="closedTxt horzCenter">closed</span>
      </div>
    );
  };

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
        Opens at {this.props.waitTime.toString(10)} {this.props.waitUnit}
      </span>
    );
  };

  onPress = () => {
    const data = {
      id: this.props.id,
      clinicName: this.props.clinicName,
      size: 'small',
    };
    this.props.onButtonPress(data);
  };

  render() {
    return (
      <div
        className={
          this.props.active
            ? 'hospitalDashCards'
            : 'hospitalDashCardsDisabled'
        }
      >
        <div className="hospitalDashCardsPad">
          <div className="waitTime boxShadowEffect">
            <span
              className={
                this.props.active ? 'center' : 'center open-time-margin'
              }
            >
              <i className="material-icons hospitalDashIconLarge">
                access_time
              </i>
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
            <div className="center boxShadowEffect commuteTime commuteTimeRight">
              <i className="material-icons hospitalDashIconSmall">
                directions_car
              </i>
              <span className="waitTimeStrSmall">
                {this.props.driveTime.toString(10)}
              </span>
              <span className="waitUnitStrSmall">
                <div>mins</div>
                <div>drive</div>
              </span>
            </div>
          </div>
          <div className="clinicNameStr">{this.props.clinicName}</div>
          <div className="addressStr">{this.props.address}</div>
        </div>
        {this.getQueueContent()}
      </div>
    );
  }
}

HospitalDashboardCard.propTypes = {
  waitUnit: PropTypes.string,
  active: PropTypes.bool,
  waitTime: PropTypes.number,
  walkTime: PropTypes.number,
  driveTime: PropTypes.number,
  address: PropTypes.string,
  clinicName: PropTypes.string,
  onButtonPress: PropTypes.func,
  id: PropTypes.number,
};

export default HospitalDashboardCard;
