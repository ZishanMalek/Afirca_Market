import {SET_SESSION_FILD} from './SessionAction';

export const SessionReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_SESSION_FILD:
      return {...state, [action.payload.key]: action.payload.value};
    default:
      return state;
  }
};
