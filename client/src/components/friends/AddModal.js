import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  Modal,
  Backdrop,
  Fade,
  Fab,
  TextField,
  Typography,
  Grid,
  Button,
  Tooltip,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { addUser } from '../../actions/events';
import { addFriend } from '../../actions/users';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginBottom: theme.spacing(2),
  },
  paper: {
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(60),
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 0,
    textAlign: 'center',
    borderRadius: theme.spacing(0.5),
    [theme.breakpoints.down('sm')]: {
      margin: '0 2rem 0 2rem',
    },
  },
}));

const AddModal = ({ addFriend, type, socket, currentEvent }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (type === 'Event') {
      try {
        const event = await axios.post(
          `/api/events/${currentEvent._id}/add_user`,
          {
            email: input,
          }
        );

        socket.emit('add user', event.data.attending);

        setInput('');
        return;
      } catch (error) {
        console.log(error);
      }
    }

    addFriend(input);

    setInput('');
  };

  return (
    <div>
      <Tooltip title='Add a friend' placement='top'>
        <Fab
          color='secondary'
          onClick={handleOpen}
          style={{ position: 'absolute', bottom: '15px', right: '20px' }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography
              variant='h5'
              color='secondary'
              className={classes.header}
            >
              Add a Friend
            </Typography>
            <form
              className={classes.root}
              autoComplete='off'
              onSubmit={(event) => onSubmit(event)}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id='outlined-basic'
                    label='Email'
                    variant='outlined'
                    required
                    fullWidth
                    color='secondary'
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type='submit'
                    variant='contained'
                    fullWidth
                    color='secondary'
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentEvent: state.event.event,
  };
};

export default connect(mapStateToProps, { addUser, addFriend })(AddModal);
