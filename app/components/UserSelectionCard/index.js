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
      <Card>
        <div>{props.title}</div>
        <div>
          <button type="button" className="circular ui icon button">
            <i className="angle right icon" />
          </button>
        </div>
      </Card>
    </React.Fragment>
  );
};

UserSelectionCard.propTypes = {
  title: PropTypes.string,
};

UserSelectionCard.propTypes = {};

export default UserSelectionCard;
