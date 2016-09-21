import { fromJS, Map } from 'immutable';


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
