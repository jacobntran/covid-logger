import {
  CREATE_EVENT,
  GET_EVENTS,
  GET_EVENT,
  ADD_USER,
  ADD_MESSAGE,
} from './types';
import axios from 'axios';

export const createEvent = (form, date) => async (dispatch, getState) => {
  const { name, address } = form;

  try {
    const newEvent = {
      name,
      address,
      date,
    };

    const {
      user: { user },
    } = getState();

    const res = await axios.post(`/api/events/${user._id}`, newEvent);

    dispatch({
      type: CREATE_EVENT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getEvents = () => async (dispatch, getState) => {
  try {
    const events = await axios.get(
      `/api/events/all/${sessionStorage.getItem('user id')}`
    );

    dispatch({
      type: GET_EVENTS,
      payload: events.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getEvent = (id) => async (dispatch) => {
  try {
    const event = await axios.get(`/api/events/${id}`);

    dispatch({
      type: GET_EVENT,
      payload: event.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// export const addUser = (email,socket) => async (dispatch, getState) => {
//   const {
//     event: {
//       event: { _id },
//     },
//   } = getState();

//   try {
//     const event = await axios.post(`/api/events/${_id}/add_user`, { email });

//     socket.broadcast('add user', event.data.attending)

//     dispatch({
//       type: ADD_USER,
//       payload: event.data.attending,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const addUser = (attending) => ({
  type: ADD_USER,
  payload: attending,
});

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  payload: message,
});
