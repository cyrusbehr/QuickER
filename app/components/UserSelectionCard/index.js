/**
 *
 * UserSelectionCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

class UserSelectionCard extends React.Component {
  redirect() {
    this.props.history.push(this.props.redirectRoute);
  }

  render() {
    return (
      <React.Fragment>
        <div className="col s6" onClick={() => this.redirect()}>
          <div className="card grey lighten-4 cardMargin">
            <div className="card-content cardTitle">
              <span className="actionSubtitle">{this.props.title}</span>
              <div className="hero-card" />
              <button type="button" className="circular ui icon button massive">
                <i className="angle right icon redbutton " />
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

UserSelectionCard.propTypes = {
  title: PropTypes.string.isRequired,
  redirectRoute: PropTypes.string.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

UserSelectionCard.propTypes = {};

export default UserSelectionCard;
