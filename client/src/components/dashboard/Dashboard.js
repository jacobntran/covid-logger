import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { getUser } from '../../actions/users';
import { getEvents } from '../../actions/events';

import AppBar from '../layout/AppBar';
import UserCard from './UserCard';
import StatusTable from './StatusTable';
import EventList from './EventList';
import LoadingBackdrop from '../layout/LoadingBackdrop';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    overflowX: 'hidden',
  },
  card: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  container: {
    flex: '1 1 auto',
    display: 'flex',
    alignItems: 'center',
  },
}));

const Dashboard = ({ user: { user, loading }, getUser, getEvents }) => {
  const classes = useStyles();

  useEffect(() => {
    getUser();
    getEvents();
  }, [getUser, getEvents]);

  return (
    <div className={`${classes.root} main_bg`}>
      {!loading ? (
        <React.Fragment>
          <AppBar />
          <Container maxWidth='lg' className={classes.container}>
            <Grid container spacing={4} alignItems='stretch'>
              <Grid container item xs={12} md={6} className={classes.card}>
                <UserCard type='dashboard' user={user} />
              </Grid>
              <Grid item xs={12} md={6}>
                <StatusTable />
              </Grid>
              <Grid container item xs={12}>
                <EventList />
              </Grid>
            </Grid>
          </Container>
        </React.Fragment>
      ) : (
        <LoadingBackdrop />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { getUser, getEvents })(Dashboard);
