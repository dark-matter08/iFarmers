import { ADD_TO_FAV, REMOVE_FAV } from '../constants';

export const addToFav = (payload: any) => {
  return {
    type: ADD_TO_FAV,
    payload: payload,
  };
};

export const removeFav = (payload: any) => {
  return {
    type: REMOVE_FAV,
    payload: payload,
  };
};
