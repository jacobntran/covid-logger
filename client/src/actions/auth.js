import axios from 'axios';
import { REGISTER, LOG_IN, AUTH_ERROR, LOG_OUT } from './types';

// sign user up
export const register = (form) => async (dispatch) => {
  try {
    const formValues = {
      ...form,
      name: `${form.firstName} ${form.lastName}`,
    };

    const user = await axios.post('/api/users', formValues);

    sessionStorage.setItem('user id', user.data._id);

    sessionStorage.setItem('authenticated', true);

    dispatch({
      type: REGISTER,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const logIn = (form) => async (dispatch) => {
  try {
    const user = await axios.post('/api/auth', form);

    sessionStorage.setItem('user id', user.data._id);

    sessionStorage.setItem('authenticated', true);

    dispatch({
      type: LOG_IN,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const logOut = () => {
  return { type: LOG_OUT };
};
