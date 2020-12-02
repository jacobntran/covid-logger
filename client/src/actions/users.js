import axios from 'axios';
import { USER_LOADED, LOG_TEST, ADD_FRIEND } from '../actions/types';

export const getUser = () => async (dispatch) => {
  const id = sessionStorage.getItem('user id');

  try {
    const user = await axios.get(`/api/users/${id}`);

    dispatch({
      type: USER_LOADED,
      payload: user.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logTest = (form, date) => async (dispatch, getState) => {
  const {
    user: { user },
  } = getState();
  const { status, location } = form;

  try {
    const newTest = {
      status,
      location,
      date,
    };

    const res = await axios.post(`/api/users/log/${user._id}`, newTest);

    dispatch({
      type: LOG_TEST,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addFriend = (email) => async (dispatch) => {
  const id = sessionStorage.getItem('user id');

  try {
    const friends = await axios.post(`/api/users/friends/${id}`, {
      email,
    });

    dispatch({
      type: ADD_FRIEND,
      payload: friends.data,
    });
  } catch (error) {
    console.log(error);
  }
};
