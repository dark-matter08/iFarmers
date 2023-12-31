import { SET_CURRENT_USER } from '../constants';

export const setCurrentUser = (payload: any) => {
  return {
    type: SET_CURRENT_USER,
    payload: payload,
  };
};

export const logoutUser = () => {
  return {
    type: SET_CURRENT_USER,
    payload: null,
  };
};
