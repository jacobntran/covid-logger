import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import {
  Grid,
  Typography,
  Button,
  Link as MaterialLink,
  Fade,
} from '@material-ui/core';

import AppBar from './AppBar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    overflowX: 'hidden',
  },
  main: {
    flex: '1 1 auto',
  },
  info: {
    textAlign: 'center',
    marginTop: '15vh',
    color: 'white',
  },
  info_head: {
    fontWeight: 700,
    [theme.breakpoints.down('md')]: {
      fontSize: '4rem',
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: '2rem',
    },
  },
  info_body: {
    marginTop: '0.6rem',
    fontWeight: 300,

    [theme.breakpoints.down('md')]: {
      fontSize: '2rem',
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
  },
  info_button: {
    marginTop: '2.5rem',
    [theme.breakpoints.down('sm')]: {
      marginTop: '1.2rem',
    },
  },
  link: {
    color: 'white',
    textAlign: 'center',
    paddingBottom: '2vh',
  },
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
}));

const Landing = ({ authenticated }) => {
  const classes = useStyles();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('xs'));

  if (authenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className={`${classes.root} main_bg`}>
      <AppBar />
      <Fade in timeout={3000}>
        <Grid
          container
          direction='column'
          justify='space-between'
          alignItems='center'
          className={classes.main}
        >
          <Grid item container className={classes.info}>
            <Grid item xs={12}>
              <Typography variant='h1' className={classes.info_head}>
                Responsible Socializing
              </Typography>
            </Grid>
            <Grid item xs={1} md={2} lg={3} />
            <Grid item xs={10} md={8} lg={6}>
              <Typography variant='h4' className={classes.info_body}>
                With the world slowly reopening during the Covid-19 pandemic,
                people are beginning to gather in groups and engage in non
                essential activities. This application aims to promote safe
                gatherings with friends and loved ones.
              </Typography>
            </Grid>
            <Grid item xs={1} md={2} lg={3} />
            <Grid item xs={12}>
              <Link to='/register' style={{ textDecoration: 'none' }}>
                <Button
                  variant='contained'
                  size={isSmallScreen ? 'small' : 'large'}
                  color='secondary'
                  className={classes.info_button}
                >
                  Get Started
                </Button>
              </Link>
            </Grid>
          </Grid>

          <Grid item className={classes.link}>
            Icons made by{' '}
            <MaterialLink
              color='secondary'
              href='https://www.flaticon.com/authors/freepik'
              title='Freepik'
              target='_blank'
            >
              Freepik
            </MaterialLink>{' '}
            from{' '}
            <MaterialLink
              color='secondary'
              href='https://www.flaticon.com/'
              title='Flaticon'
              target='_blank'
            >
              {' '}
              www.flaticon.com
            </MaterialLink>
          </Grid>
        </Grid>
      </Fade>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Landing);
