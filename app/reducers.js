import {
  DEFAULT_STATE,
  setTeachers
} from './actions';

import constants from './constants';


export function coreReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
  case constants.SET_TEACHERS:
    return setTeachers(state, action.teachers);
  default:
    return state;
  }

  return state;
}
