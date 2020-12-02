import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
// import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EventIcon from '@material-ui/icons/Event';
// import DeleteIcon from '@material-ui/icons/Delete';
import Badge from '@material-ui/core/Badge';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    [theme.breakpoints.down('lg')]: {
      height: '15rem',
    },
    height: '20rem',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(0.5),
    overflow: 'auto',
  },
  list: {
    paddingTop: 0,
  },
  header: {
    backgroundColor: theme.palette.secondary.main,
    borderTopLeftRadius: theme.spacing(0.5),
    borderTopRightRadius: theme.spacing(0.5),
    position: 'sticky',
  },
  divider: {
    marginBottom: theme.spacing(1),
  },
}));

const EventList = ({ events }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List className={classes.list}>
        <ListItem className={classes.header}>
          <Typography variant='h6'>Events</Typography>
        </ListItem>
        <Divider className={classes.divider} />
        {events
          ? events.map((event) => (
              <React.Fragment key={event._id}>
                <ListItem button component={Link} to={`event/${event._id}`}>
                  <ListItemAvatar>
                    <Badge
                      badgeContent={event.attending.length}
                      color='secondary'
                    >
                      <EventIcon />
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText primary={`${event.name}`} />
                  {/* <ListItemSecondaryAction>
                    <IconButton edge='end' aria-label='delete'>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction> */}
                </ListItem>
              </React.Fragment>
            ))
          : null}
      </List>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    events: state.event.events,
  };
};

export default connect(mapStateToProps)(EventList);
