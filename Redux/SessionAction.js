export const SET_SESSION_FILD = 'set_session_fild';

export const setSessionFild = (key, value) => {
  return {
    type: SET_SESSION_FILD,
    payload: {key, value},
  };
};
