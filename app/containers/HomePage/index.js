import React from 'react';
import UserSelectionCard from 'components/UserSelectionCard/index';
import { LoginCardData } from './constants';
/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.Component {
  render() {
    return (
      <div className="homePageContainer">
        <div>
          <div className="align-text-center title-margin">
            <div className="cFontItalics cRed-Text">
              <span className="lighter title-font-size">Quick</span>
              <span className="bolder title-font-size">ER</span>
            </div>
            <div className="action-subtitle cFont cBlue-Text">
              Choose your role
            </div>
          </div>
        </div>
        <div className="login-card-contianer">
          {LoginCardData.map(data => {
            return (
              <UserSelectionCard
                key={data.title}
                title={data.title}
                redirectRoute={data.redirectRoute}
                {...this.props}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
