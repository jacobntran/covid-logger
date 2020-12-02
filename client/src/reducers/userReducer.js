import {
  USER_LOADED,
  LOG_TEST,
  ADD_NOTFICATION,
  REMOVE_NOTFICATION,
  LOG_OUT,
  ADD_FRIEND,
  // GET_FRIENDS,
  AUTH_ERROR,
} from '../actions/types';

const initialState = {
  user: null,
  loading: true,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return { ...state, user: payload, loading: false };
    case LOG_TEST:
      return {
        ...state,
        user: { ...state.user, tests: payload },
        loading: false,
      };
    case ADD_FRIEND:
      // case GET_FRIENDS:
      return {
        ...state,
        user: { ...state.user, friends: payload },
        // loading: false
      };
    case ADD_NOTFICATION:
    case REMOVE_NOTFICATION:
      return { ...state, user: { ...state.user, notifications: payload } };
    case AUTH_ERROR:
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};

// export default (state = {}, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case GET_USER:
//       return { ...payload };
//     case LOG_TEST:
//       return { ...state, tests: payload };
//     case ADD_NOTFICATION:
//     case REMOVE_NOTFICATION:
//       return { ...state, notifications: payload };
//     case LOG_OUT:
//       return initialState;
//     default:
//       return state;
//   }
// };
