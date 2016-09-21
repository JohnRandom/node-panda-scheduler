import {
  setTeachers
} from './actions';

import {
  SET_TEACHERS
} from './constants';


export function coreReducer(state, action) {
  switch (action.type) {
  case SET_TEACHERS:
    return setTeachers(state, action.teachers);
  default:
    return state;
  }

  return state;
}
