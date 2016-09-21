import { fromJS, Map } from 'immutable';
import { expect } from 'chai';

import {
  setTeachers,
  addTeacher,
  setLessons,
  addLesson,
  addStudentToLesson,
  setStudentsForLesson
} from '../app/actions';


describe('Actions', () => {
  let state = null;

  beforeEach(() => {
    state = Map();
  });

  describe('for teachers', () => {
    let teachers = null;

    beforeEach(() => {
      teachers = [{
        id: 'ae535d61-26b0-4e26-8574-1d0e4e75bbc1',
        name: 'Bertha Smith'
      }, {
        id: 'ae535d61-26b0-4e26-8574-1d0e4e75bbc2',
        name: 'The Dude'
      }];
    });

    describe('setTeachers', () => {
      it('sets the teachers for the state', () => {
        const nextState = setTeachers(state, teachers);

        expect( nextState ).to.equal(Map({ teachers: fromJS(teachers) }));
      });
    });

    describe('addTeacher', () => {
      it('adds a teacher to the state', () => {
        state = state.set('teachers', fromJS([ teachers[0] ]));
        const nextState = addTeacher(state, teachers[1]);

        expect( nextState ).to.equal(Map({ teachers: fromJS(teachers) }));
      });
    });
  });

  describe('for lessons', () => {
    let lessons = null;

    beforeEach(() => {
      lessons = [{
        id: 'ae535d61-26b0-4e26-8574-1d0e4e75bbc3',
        subject: 'English 101',
        teacher: 'ae535d61-26b0-4e26-8574-1d0e4e75bbc1',
        students: [],
        date_starting: null,
        date_ending: null,
        weekday: 'Monday'
      }, {
        id: 'ae535d61-26b0-4e26-8574-1d0e4e75bbc4',
        subject: 'English 101',
        teacher: 'ae535d61-26b0-4e26-8574-1d0e4e75bbc1',
        students: [],
        date_starting: null,
        date_ending: null,
        weekday: 'Tuesday'
      }];
    });

    describe('setLessons', () => {
      it('sets the lessons for the state', () => {
        const nextState = setLessons(state, lessons);

        expect( nextState ).to.equal(Map({ lessons: fromJS(lessons) }));
      });
    });

    describe('addLesson', () => {
      it('adds the lesson to the state', () => {
        state = state.set('lessons', fromJS([ lessons[0] ]));
        const nextState = addLesson(state, lessons[1]);

        expect( nextState ).to.equal(Map({ lessons: fromJS(lessons) }));
      });
    });
  });

  describe('for students', () => {
    let students = null;
    let lesson = null;

    function getLesson(mixin = {}) {
      return Object.assign({
        id: 'ae535d61-26b0-4e26-8574-1d0e4e75bbc3',
        subject: 'English 101',
        teacher: 'ae535d61-26b0-4e26-8574-1d0e4e75bbc1',
        students: [],
        date_starting: null,
        date_ending: null,
        weekday: 'Monday'
      }, mixin);
    }

    beforeEach(() => {
      students = [{
        id: 'ae535d61-26b0-4e26-8574-1d0e4e75bbc5',
        name: 'Robin'
      }, {
        id: 'ae535d61-26b0-4e26-8574-1d0e4e75bbc6',
        name: 'Superboy'
      }];
    });

    describe('setStudents', () => {
      context('for an existing lesson', () => {
        beforeEach(() => {
          state = setLessons(state, [getLesson()]);
        });

        it('sets the students for the state', () => {
          const nextState = setStudentsForLesson(state, getLesson(), students);
          lesson = getLesson({ students });

          expect( nextState ).to.equal(Map({ lessons: fromJS([lesson]) }));
        });
      });

      context('for a non existing lesson', () => {
        beforeEach(() => {
          state = setLessons(state, []);
        });

        it('does not update the state', () => {
          const nextState = setStudentsForLesson(state, getLesson(), students);

          expect( nextState ).to.equal(Map({ lessons: fromJS([]) }));
        });
      });
    });

    describe('addStudent', () => {
      context('for an existing lesson', () => {
        beforeEach(() => {
          lesson = getLesson({ students: [students[0]] });
          state = setLessons(state, [lesson]);
        });

        it('adds the lesson to the state', () => {
          const nextState = addStudentToLesson(state, lesson, students[1]);
          lesson.students.push(students[1]);

          expect( nextState ).to.equal(Map({ lessons: fromJS([lesson]) }));
        });
      });

      context('for a non existing lesson', () => {
        beforeEach(() => {
          lesson = getLesson();
          state = setLessons(state, []);
        });

        it('adds the lesson to the state', () => {
          const nextState = addStudentToLesson(state, lesson, students[1]);

          expect( nextState ).to.equal(Map({ lessons: fromJS([]) }));
        });
      });
    });
  });
});
