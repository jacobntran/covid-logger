import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

import AppBar from '../layout/AppBar';
import UserCard from '../dashboard/UserCard';
import AddModal from './AddModal';
import { getUser } from '../../actions/users';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    overflowX: 'hidden',
    // position: 'relative',
    overflow: 'auto',
  },
  container: {
    textAlign: 'center',
    paddingTop: '10rem',
    color: 'white',
  },
  friendsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'flex-start',
    flex: '1 1 auto',
    flexWrap: 'wrap',
    paddingTop: '1rem',
  },
}));

const Friends = ({ user: { user, loading }, getUser }) => {
  const classes = useStyles();

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <React.Fragment>
      <div className={`${classes.root} alt_bg`}>
        <AppBar />
        <Container
          maxWidth='lg'
          className={
            !loading && user.friends.length > 0
              ? classes.friendsContainer
              : classes.container
          }
        >
          {!loading && user.friends.length > 0 ? (
            user.friends.map((friend) => {
              return (
                <React.Fragment>
                  <UserCard key={friend._id} user={friend} />
                </React.Fragment>
              );
            })
          ) : (
            <Typography variant='h2'>
              Looks like you currently have no friends... Add some to keep track
              of their Covid-19 status!
              <br />
              <InsertEmoticonIcon style={{ height: '7rem', width: '7rem' }} />
            </Typography>
          )}
        </Container>
      </div>
      <AddModal />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { getUser })(Friends);
