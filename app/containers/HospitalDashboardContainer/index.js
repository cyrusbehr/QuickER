/**
 *
 * HospitalDashboardContainer
 *
 */

import HospitalDashboardCard from 'components/HospitalDashboardCard/index';
import HospitalDashboardNavbar from 'components/HospitalDashboardNavbar/index';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { DashboardCardData } from './constants';
import reducer from './reducer';
import saga from './saga';
import makeSelectHospitalDashboardContainer from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class HospitalDashboardContainer extends React.Component {
  state = { open: false };

  showModal = data =>
    this.setState({
      size: data.size,
      open: true,
      id: data.id,
      clinicName: data.clinicName,
    });

  close = () => this.setState({ open: false });

  render() {
    const { open, size } = this.state;

    const inlineStyle = {
      modal: {
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    };
    return (
      <React.Fragment>
        <HospitalDashboardNavbar />
        <div className="hospitalDashCardContainer">
          {DashboardCardData.map(data => {
            return (
              <HospitalDashboardCard
                key={data.clinicName}
                clinicName={data.clinicName}
                waitTime={data.waitTime}
                walkTime={data.walkTime}
                waitUnit={data.waitUnit}
                driveTime={data.driveTime}
                address={data.address}
                active={data.active}
                id={data.id}
                onButtonPress={data => this.showModal(data)}
              />
            );
          })}
        </div>
        <Modal
          size={size}
          open={open}
          onClose={this.close}
          style={inlineStyle.modal}
        >
          ><Modal.Header>Add patient to queue</Modal.Header>
          <Modal.Content>
            <p>{this.state.clinicName}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>
              Cancel
            </Button>
            <Button positive content="Yes">
              Confirm
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}

HospitalDashboardContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  hospitalDashboardContainer: makeSelectHospitalDashboardContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'hospitalDashboardContainer',
  reducer,
});
const withSaga = injectSaga({ key: 'hospitalDashboardContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HospitalDashboardContainer);
