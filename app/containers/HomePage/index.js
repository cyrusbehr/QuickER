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

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <div className="centerItems">
            <span className="defaultTitleFont" >
              Quickeeee
            </span>
            <span className="extraboldTitleFont">ER</span>
            <div>choose your role</div>
          </div>
        </div>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Dropdown button
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="#test1">
              Action
            </a>
            <a className="dropdown-item" href="#tes2">
              Another action
            </a>
            <a className="dropdown-item" href="#test1">
              Something else here
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
