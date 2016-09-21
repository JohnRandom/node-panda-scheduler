import constants from './constants';


export function setTeachers(teachers) {
  return {
    type: constants.SET_TEACHERS,
    teachers
  };
}

export function addTeacher(teacher) {
  return {
    type: constants.ADD_TEACHER,
    teacher
  };
}

export function setLessons(lessons) {
  return {
    type: constants.SET_LESSONS,
    lessons
  };
}

export function addLesson(lesson) {
  return {
    type: constants.ADD_LESSON,
    lesson
  };
}

export function setStudentsForLesson(lesson, students) {
  return {
    type: constants.SET_STUDENTS_FOR_LESSON,
    lesson,
    students
  };
}

export function addStudentToLesson(lesson, student) {
  return {
    type: constants.ADD_STUDENT_TO_LESSON,
    lesson,
    student
  };
}
