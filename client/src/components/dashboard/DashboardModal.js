import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Modal,
  Backdrop,
  Fade,
  Button,
  TextField,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import { createEvent } from '../../actions/events';
import { logTest } from '../../actions/users';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  header: {
    marginBottom: theme.spacing(2),
  },
  formControl: {
    width: '100%',
  },
}));

const DashboardModal = ({ type, button, createEvent, logTest }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [form, setForm] = useState({
    name: '',
    address: '',
    status: '',
    location: '',
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    switch (type) {
      case 'event':
        createEvent(form, selectedDate);
        setForm({
          name: '',
          address: '',
          status: '',
          location: '',
        });
        handleDateChange(new Date());
        break;
      case 'test':
        logTest(form, selectedDate);
        setForm({
          name: '',
          address: '',
          status: '',
          location: '',
        });
        handleDateChange(new Date());
        break;
      default:
        return;
    }
  };

  return (
    <div>
      <Button
        size='small'
        color='secondary'
        variant='contained'
        onClick={handleOpen}
      >
        {button}
      </Button>
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
              {button}
            </Typography>
            <form onSubmit={(event) => onSubmit(event)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {type === 'event' ? (
                    <TextField
                      autoComplete='off'
                      name='name'
                      variant='outlined'
                      required
                      fullWidth
                      id='eventName'
                      label='Event Name'
                      color='secondary'
                      value={form.name}
                      onChange={(event) => onChange(event)}
                    />
                  ) : (
                    <FormControl
                      variant='outlined'
                      className={classes.formControl}
                      required
                    >
                      <InputLabel id='demo-simple-select-outlined-label'>
                        Status
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-outlined-label'
                        id='demo-simple-select-outlined'
                        name='status'
                        value={form.status}
                        onChange={(event) => onChange(event)}
                        label='Status'
                      >
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={'Negative'}>Negative</MenuItem>
                        <MenuItem value={'Positive'}>Positive</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                </Grid>
                <Grid item xs={12}>
                  {type === 'event' ? (
                    <TextField
                      autoComplete='off'
                      name='address'
                      variant='outlined'
                      required
                      fullWidth
                      id='eventAddress'
                      label='Address'
                      color='secondary'
                      value={form.address}
                      onChange={(event) => onChange(event)}
                    />
                  ) : (
                    <TextField
                      autoComplete='off'
                      name='location'
                      variant='outlined'
                      required
                      fullWidth
                      id='location'
                      label='Location'
                      color='secondary'
                      value={form.location}
                      onChange={(event) => onChange(event)}
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                      value={selectedDate}
                      onChange={handleDateChange}
                      inputVariant='outlined'
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
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

// const mapStateToProps = (state) => {
//   return {

//   }
// }

export default connect(null, { createEvent, logTest })(DashboardModal);
