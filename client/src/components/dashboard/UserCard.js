import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import MoodIcon from '@material-ui/icons/Mood';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import Divider from '@material-ui/core/Divider';

import DashboardModal from './DashboardModal';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '15rem',
    height: '22rem',
    textAlign: 'center',
    backgroundColor: theme.palette.primary.light,
  },
  altRoot: {
    minWidth: '12rem',
    height: '17rem',
    textAlign: 'center',
    backgroundColor: theme.palette.primary.light,
    border: `3px solid ${theme.palette.primary.dark}`,
    margin: '0.5rem',
  },
  iconArea: {
    height: '50%',
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    fontSize: '5rem',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 0,
  },
}));

export default function ImgMediaCard({ user, type }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Card className={type === 'dashboard' ? classes.root : classes.altRoot}>
        <CardActionArea className={classes.iconArea}>
          {user.tests.length > 0 && user.tests[0].status === 'Positive' ? (
            <MoodBadIcon style={{ color: 'red' }} className={classes.icon} />
          ) : (
            <MoodIcon
              style={
                user.tests.length > 0 && user.tests[0].status === 'Negative'
                  ? { color: 'green' }
                  : { color: '#ffb300' }
              }
              className={classes.icon}
            />
          )}
          {/* <MoodIcon
            style={
              user.tests.length > 0
                ? renderColor(user.tests[0].status)
                : { color: '#ffb300' }
            }
            className={classes.icon}
          /> */}
        </CardActionArea>
        <Divider />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {user.name}
          </Typography>
          <Typography variant='body2' component='p'>
            Status: {user.tests.length > 0 ? user.tests[0].status : 'N/A'}
            <br />
            Last Tested:{' '}
            {user.tests.length > 0
              ? new Date(user.tests[0].date).toLocaleDateString()
              : 'N/A'}
          </Typography>
        </CardContent>
        {type === 'dashboard' ? (
          <CardActions
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <DashboardModal type='event' button='Create Event' />
            <DashboardModal type='test' button='Log a Test' />
          </CardActions>
        ) : null}
      </Card>
    </React.Fragment>
  );
}
