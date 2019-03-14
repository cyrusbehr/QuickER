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

  getWaitMinCont = () => {
    if (this.props.mins > 0) {
      return (
        <React.Fragment>
          <span className="waitTimeStr">{this.props.mins}</span>
          <span className="waitUnitStr">
            {this.props.mins === 1 ? 'MIN' : 'MINS'}
          </span>
        </React.Fragment>
      );
    }
    return '';
  };

  getWaitHrCont = () => {
    if (this.props.hours > 0) {
      return (
        <React.Fragment>
          <span className="waitTimeStr">{this.props.hours}</span>
          <span className="waitUnitStr">
            {this.props.hours === 1 ? 'HR' : 'HRS'}
          </span>
        </React.Fragment>
      );
    }
    return '';
  };

  getWaitTimeContent = () => {
    if (this.props.active) {
      return (
        <span className="">
          <i className="material-icons hospitalDashIconLarge">access_time</i>
          {this.getWaitHrCont()}
          {this.getWaitMinCont()}
        </span>
      );
    }
    return <span className="closedCardWaitTimeStr">{this.props.message}</span>;
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
          this.props.active ? 'hospitalDashCards' : 'hospitalDashCardsDisabled'
        }
      >
        <div className="hospitalDashCardsPad">
          <div
            className={
              this.props.active
                ? 'waitTime boxShadowEffect'
                : 'waitTime boxShadowEffect center'
            }
          >
            {this.getWaitTimeContent()}
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
  waitTime: PropTypes.string,
  walkTime: PropTypes.number,
  driveTime: PropTypes.number,
  address: PropTypes.string,
  clinicName: PropTypes.string,
  onButtonPress: PropTypes.func,
  id: PropTypes.string,
};

export default HospitalDashboardCard;
