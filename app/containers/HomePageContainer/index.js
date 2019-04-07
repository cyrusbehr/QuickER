/**
 *
 * HomePageContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import UserSelectionCard from 'components/UserSelectionCard/index';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import injectReducer from 'utils/injectReducer';
import { LoginCardData } from './constants';

import makeSelectHomePageContainer from './selectors';
import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class HomePageContainer extends React.Component {
  state = {
    appear: false,
    allowClick: false,
  };

  componentDidMount() {
    this.setState({
      appear: true,
    });

    // Only allow the cards to be clicked on after they have rended to the screen (takes 3200ms for animation to complete)
    this.timeoutId = setTimeout(() => {
      this.setState({ allowClick: true });
    }, 3200);
  }

  render() {
    return (
      <div className="homePageContainer">
        <div>
          <div className="align-text-center title-margin">
            <div className="cFontItalics cRed-Text">
              <TransitionGroup>
                <CSSTransition
                  in={this.state.appear}
                  appear
                  timeout={1200}
                  children={
                    <div>
                      <span className="lighter title-font-size">Quick</span>
                      <span className="bolder title-font-size">ER</span>
                    </div>
                  }
                  classNames="fade"
                />
              </TransitionGroup>
            </div>
            <TransitionGroup>
              <CSSTransition
                in={this.state.appear}
                appear
                timeout={2500}
                children={
                  <div className="action-subtitle cFont cBlue-Text">
                    Choose your role
                  </div>
                }
                classNames="fade2"
              />
            </TransitionGroup>
          </div>
        </div>
        <div className="login-card-contianer">
          {LoginCardData.map(data => {
            return (
              <TransitionGroup key={data.title}>
                <CSSTransition
                  in={this.state.appear}
                  appear
                  timeout={40000}
                  children={
                    <UserSelectionCard
                      allowClick={this.state.allowClick}
                      key={data.title}
                      title={data.title}
                      redirectRoute={data.redirectRoute}
                      {...this.props}
                      onClickFunc={() => console.log('')}
                    />
                  }
                  classNames="fade3"
                />
              </TransitionGroup>
            );
          })}
        </div>
      </div>
    );
  }
}

HomePageContainer.propTypes = {
  //dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  homePageContainer: makeSelectHomePageContainer(),
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

const withReducer = injectReducer({ key: 'homePageContainer', reducer });

export default compose(
  withReducer,
  withConnect,
)(HomePageContainer);
