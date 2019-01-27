/**
 *
 * UserSelectionCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';

const UserSelectionCard = props => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">{props.title}</span>
              <button type="button" className="circular ui icon button">
                <i className="angle right icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

UserSelectionCard.propTypes = {
  title: PropTypes.string,
};

UserSelectionCard.propTypes = {};

export default UserSelectionCard;
