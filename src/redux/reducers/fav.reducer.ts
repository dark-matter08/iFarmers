import { ADD_TO_FAV, REMOVE_FAV } from '../constants';
import { Action } from '../types';

const initialState: any[] = [];

export const favReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_TO_FAV:
      state.push(action.payload);
      return state;

    case REMOVE_FAV:
      const new_state = state.filter((item) => item.id !== action.payload.id);
      return new_state;
    default:
      return state;
  }
};
