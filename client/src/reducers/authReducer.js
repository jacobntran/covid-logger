import { REGISTER, LOG_IN, AUTH_ERROR, LOG_OUT } from '../actions/types';

const initialState = {
  isAuthenticated: !!sessionStorage.getItem('authenticated'),
  loading: !sessionStorage.getItem('authenticated'),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
    case LOG_IN:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case AUTH_ERROR:
    case LOG_OUT:
      sessionStorage.removeItem('user id');
      sessionStorage.removeItem('authenticated');
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};
