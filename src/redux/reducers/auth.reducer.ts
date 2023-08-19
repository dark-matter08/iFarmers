import { isEmpty } from '../../utils/isEmpty';
import { SET_CURRENT_USER } from '../constants';
import { Action } from '../types';

const initialState = {
  isAuthenticated: false,
  user: null,
};

export const authReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
};
