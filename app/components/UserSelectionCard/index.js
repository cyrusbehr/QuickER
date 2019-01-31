/**
 *
 * UserSelectionCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

class UserSelectionCard extends React.Component {
  redirect() {
    this.props.history.push(this.props.redirectRoute);
  }

  render() {
    return (
      <React.Fragment>
        <div
          className="card login-card align-text-center hover-grow cursor-pointer"
          onClick={() => this.redirect()}
        >
          <div className="actionSubtitle">{this.props.title}</div>
          <div className="loginButton">
            <Fab color="default">
              <Icon className="icon-color">navigate_next</Icon>
            </Fab>
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
