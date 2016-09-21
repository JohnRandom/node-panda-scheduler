import {
  DEFAULT_STATE,
  setTeachers,
  addTeacher,
  setLessons,
  addLesson,
  setStudentsForLesson,
  addStudentToLesson
} from './actions';

import constants from './constants';


export function coreReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
  case constants.SET_TEACHERS:
    return setTeachers(state, action.teachers);
  case constants.ADD_TEACHER:
    return addTeacher(state, action.teacher);
  case constants.SET_LESSONS:
    return setLessons(state, action.lessons);
  case constants.ADD_LESSON:
    return addLesson(state, action.lesson);
  case constants.SET_STUDENTS_FOR_LESSON:
    return setStudentsForLesson(state, action.lesson, action.students);
  case constants.ADD_STUDENT_TO_LESSON:
    return addStudentToLesson(state, action.lesson, action.student);
  default:
    return state;
  }
}
