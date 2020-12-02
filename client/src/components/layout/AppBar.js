import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  AppBar,
  Toolbar,
  Button,
  Tooltip,
  Hidden,
  Menu,
  MenuItem,
  IconButton,
  // IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleIcon from '@material-ui/icons/People';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import NotificationsIcon from '@material-ui/icons/Notifications';

import heartIcon from '../../assets/heart-icon.png';
import { register, logIn, logOut } from '../../actions/auth';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between',
    },
  },
  toolBar: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between',
    },
  },
  icon: {
    height: '2.5rem',
    marginRight: '10px',
  },
  name: {
    display: 'inline-block',
    color: theme.palette.secondary.main,
    fontFamily: 'Comfortaa',
    fontWeight: 500,
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  button: {
    marginLeft: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
    '&:visited': { color: theme.palette.secondary.main },
    '&:active': { color: theme.palette.secondary.main },
  },
}));

const NavBar = ({ auth: { isAuthenticated }, logOut }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderAdmin = () => {
    if (isAuthenticated) {
      return (
        <React.Fragment>
          {/* <Tooltip title='Notifications'>
            <IconButton className={classes.button}>
              <NotificationsIcon />
            </IconButton>
          </Tooltip> */}
          <Tooltip title='Friends'>
            <Link to='/friends'>
              <IconButton className={classes.button}>
                <PeopleIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title='Logout'>
            <IconButton className={classes.button} onClick={logOut}>
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Link to='/register' className={classes.link}>
          <Button variant='contained' size='large' className={classes.button}>
            Register
          </Button>
        </Link>
        <Link to='/login' className={classes.link}>
          <Button variant='contained' size='large' className={classes.button}>
            Login
          </Button>
        </Link>
      </React.Fragment>
    );
  };

  return (
    <AppBar position='static' className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <Tooltip title='Icons made by Freepik from www.flaticon.com'>
          <img className={classes.icon} src={heartIcon} alt='heart icon' />
        </Tooltip>
        <Typography className={classes.name} variant='h4'>
          <Link to='/' className={classes.link}>
            Covid Logger
          </Link>
        </Typography>
        <Hidden smDown>{renderAdmin()}</Hidden>
        <Hidden mdUp>
          <IconButton
            aria-controls='simple-menu'
            aria-haspopup='true'
            onClick={handleClick}
            color='primary'
          >
            <MenuIcon />
          </IconButton>
          {isAuthenticated ? (
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {/* <MenuItem onClick={handleClose}>Notifications</MenuItem> */}
              <Link to='/' className={classes.link}>
                <MenuItem>Home</MenuItem>
              </Link>
              <Link to='/friends' className={classes.link}>
                <MenuItem>Friends</MenuItem>
              </Link>
              <MenuItem onClick={logOut} className={classes.link}>
                Logout
              </MenuItem>
            </Menu>
          ) : (
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Link to='/register' className={classes.link}>
                <MenuItem onClick={register}>Register</MenuItem>
              </Link>
              <Link to='/login' className={classes.link}>
                <MenuItem onClick={logIn}>Log In</MenuItem>
              </Link>
            </Menu>
          )}
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { register, logIn, logOut })(NavBar);
