import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBackrop from '../layout/LoadingBackdrop';

const ProtectedRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      loading ? (
        <LoadingBackrop />
      ) : isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to='/' />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ProtectedRoute);
