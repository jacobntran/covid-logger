import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Container, Typography } from '@material-ui/core';

import { addUser, getEvent } from '../../actions/events';
import { getUser } from '../../actions/users';

import AppBar from '../layout/AppBar';
import UserCard from '../dashboard/UserCard';
import AddModal from '../friends/AddModal';
import EventChat from './EventChat';
import LoadingBackdrop from '../layout/LoadingBackdrop';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    overflowX: 'hidden',
  },
  container: {
    flex: '1 1 auto',
    display: 'flex',
    alignItems: 'center',
  },
  main: {
    height: '80vh',
    position: 'relative',
    display: 'flex',
    flexFlow: 'column',
  },
  header: {
    backgroundColor: theme.palette.secondary.main,
    textAlign: 'center',
    flex: '0 1 auto',
  },
  attendingContainer: {
    display: 'flex',
    padding: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
    // flex: '1 1 auto',
    overflow: 'auto',
  },
}));

let socket;

const Event = ({
  event: { event, loading },
  match: { params },
  getEvent,
  getUser,
  addUser,
}) => {
  const classes = useStyles();
  const ENDPOINT = 'http://localhost:3001' || process.env.ENDPOINT;

  useEffect(() => {
    getUser();
    getEvent(params.id);

    socket = io(ENDPOINT);

    socket.emit('join room', params.id);

    socket.on('add user', (attending) => {
      addUser(attending);
    });

    return () => {
      socket.emit('disconnect');

      socket.disconnect();
    };
  }, [getUser, getEvent, params.id, addUser]);

  const parseDate = (date) => {
    const newDate = new Date(date);

    return `${newDate.toLocaleDateString()}, ${newDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  };

  return (
    <React.Fragment>
      {!loading ? (
        <div className={`${classes.root} alt_bg`}>
          <AppBar />
          <Container maxWidth='xl' className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={9}>
                <Paper className={classes.main}>
                  <Paper className={classes.header}>
                    <Typography variant='h5'>{event.name}</Typography>
                    <Typography variant='subtitle1'>
                      {parseDate(event.date)} <br /> {event.address}
                    </Typography>
                  </Paper>
                  <div className={classes.attendingContainer}>
                    {event
                      ? event.attending.map((attendee) => (
                          <UserCard key={attendee.name} user={attendee} />
                        ))
                      : null}
                  </div>
                  <AddModal type='Event' socket={socket} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <EventChat socket={socket} />
              </Grid>
            </Grid>
          </Container>
        </div>
      ) : (
        <LoadingBackdrop />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    event: state.event,
  };
};

export default connect(mapStateToProps, { getEvent, getUser, addUser })(Event);
