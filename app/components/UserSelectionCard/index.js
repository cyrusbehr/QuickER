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
      
        <div className="col s6">
          <div className="card grey lighten-4 ">
            <div className="card-content ">
              <span className="actionSubtitle">{props.title}</span>
              <div className="hero-card"></div>
              <button type="button" className="circular ui icon button">
                <i className="angle right icon" /> 
              </button>
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
