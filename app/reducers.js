import { fromJS, Map } from 'immutable';
import constants from './constants';


export const DEFAULT_STATE = Map();

export function setTeachers(currentState, teachers) {
  return currentState.set('teachers', fromJS(teachers));
}

export function addTeacher(currentState, teacher) {
  return currentState.update('teachers', (teachers) => {
    return teachers.push(fromJS(teacher));
  });
}

export function setLessons(currentState, lessons) {
  return currentState.set('lessons', fromJS(lessons));
}

export function addLesson(currentState, lesson) {
  return currentState.update('lessons', (lessons) => {
    return lessons.push(fromJS(lesson));
  });
}

export function setStudentsForLesson(currentState, lesson, students) {
  const idx = currentState.get('lessons').findIndex((elem) => {
    return elem.get('id') === lesson.id;
  });

  if (idx === -1) { return currentState; }

  return currentState.update('lessons', (lessons) => {
    return lessons.update(idx, (elem) => {
      return elem.set('students', fromJS(students));
    });
  });
}

export function addStudentToLesson(currentState, lesson, student) {
  const idx = currentState.get('lessons').findIndex((elem) => {
    return elem.get('id') === lesson.id;
  });

  if (idx === -1) { return currentState; }

  return currentState.update('lessons', (lessons) => {
    return lessons.update(idx, (elem) => {
      return elem.set('students', elem.get('students').push(fromJS(student)));
    });
  });
}

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

export default coreReducer;
