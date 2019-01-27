/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */
import React from 'react';
import UserSelectionCard from '../../components/UserSelectionCard/index';
import { LoginCardData } from './constants';
/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <div className="centerItems">
            <span className="titleFont lighterTitleFont">Quick</span>
            <span className="titleFont extraboldTitleFont">ER</span>
            <div className="actionSubtitle">choose your role</div>
          </div>
        </div>
        <div className="row">
          <UserSelectionCard title="Hospital" />

          <UserSelectionCard title="Clinic" />
        </div>
      </React.Fragment>
    );
  }
}
