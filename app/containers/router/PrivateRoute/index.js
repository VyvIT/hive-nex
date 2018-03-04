import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectAppUser } from '../../../App/reducer';

class PrivateRouter extends Component {

  render() {
    const { component: Component, ...rest } = this.props;
    const { currentUser } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          currentUser ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          )
        }
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectAppUser,
});
const withConnect = connect(mapStateToProps/*, { ...actions }*/);

export default compose(
  withConnect,
)(PrivateRouter);
