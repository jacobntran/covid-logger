import {
  CREATE_EVENT,
  GET_EVENT,
  GET_EVENTS,
  ADD_USER,
  ADD_MESSAGE,
} from '../actions/types';

const intialState = {
  event: null,
  events: [],
  loading: true,
};

export default (state = intialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_EVENT:
      return {
        ...state,
        events: [...state.events, payload],
      };
    case GET_EVENT:
      return {
        ...state,
        event: payload,
        loading: false,
      };
    case GET_EVENTS:
      return {
        ...state,
        events: payload,
      };
    case ADD_USER:
      return {
        ...state,
        event: { ...state.event, attending: payload },
      };
    case ADD_MESSAGE:
      return {
        ...state,
        event: { ...state.event, chat: [...state.event.chat, payload] },
      };
    default:
      return state;
  }
};
