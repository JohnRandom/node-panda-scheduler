import {
  setTeachers,
  addTeacher,
  setLessons,
  addLesson,
  addStudentToLesson,
  setStudentsForLesson,
  coreReducer
} from '../app/reducers';
import constants from '../app/constants';
import { expect } from 'chai';
import { fromJS, Map } from 'immutable';


describe('Reducer', () => {
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

  describe('coreReducer', () => {
    context('with an undefined state', () => {
      it('initialises the state', ()=> {
        const newState = coreReducer(undefined, {
          type: constants.SET_TEACHERS, teachers: []
        });

        expect( newState ).to.equal( fromJS({ teachers: [] }) );
      });
    });

    describe('SET_TEACHERS', () => {
      let newState;

      beforeEach(() => {
        newState = coreReducer(undefined, {
          type: constants.SET_TEACHERS,
          teachers: [
            { name: 'Bertha Smith', id: 'teacher-1' },
            { name: 'Darth Vader', id: 'teacher-2' }
          ]
        });
      });

      it('sets the teachers on the state', () => {
        const expectedState = fromJS({
          teachers: [
            { name: 'Bertha Smith', id: 'teacher-1' },
            { name: 'Darth Vader', id: 'teacher-2' }
          ]
        });

        expect( newState ).to.equal( expectedState );
      });
    });

    describe('ADD_TEACHER', () => {
      let newState;

      beforeEach(() => {
        state = fromJS({
          teachers: [{ name: 'Bertha Smith', id: 'teacher-1' }]
        });

        newState = coreReducer(state, {
          type: constants.ADD_TEACHER,
          teacher: { name: 'Darth Vader', id: 'teacher-2' }
        });
      });

      it('adds the teacher to the state', () => {
        const expectedState = fromJS({
          teachers: [
            { name: 'Bertha Smith', id: 'teacher-1' },
            { name: 'Darth Vader', id: 'teacher-2' }
          ]
        });

        expect( newState ).to.equal( expectedState );
      });
    });

    describe('SET_LESSONS', () => {
      let newState;

      beforeEach(() => {
        newState = coreReducer(undefined, {
          type: constants.SET_LESSONS,
          lessons: [
            { title: 'English 101', id: 'lesson-1' },
            { title: 'Conversational English', id: 'lesson-2' }
          ]
        });
      });

      it('sets the lessons on the state', () => {
        const expectedState = fromJS({
          lessons: [
            { title: 'English 101', id: 'lesson-1' },
            { title: 'Conversational English', id: 'lesson-2' }
          ]
        });

        expect( newState ).to.equal( expectedState );
      });
    });

    describe('ADD_LESSON', () => {
      let newState;

      beforeEach(() => {
        state = fromJS({
          lessons: [{ title: 'English 101', id: 'lesson-1' }]
        });

        newState = coreReducer(state, {
          type: constants.ADD_LESSON,
          lesson: { title: 'Conversational English', id: 'lesson-2' }
        });
      });

      it('adds the teacher to the state', () => {
        const expectedState = fromJS({
          lessons: [
            { title: 'English 101', id: 'lesson-1' },
            { title: 'Conversational English', id: 'lesson-2' }
          ]
        });

        expect( newState ).to.equal( expectedState );
      });
    });

    describe('SET_STUDENTS_FOR_LESSON', () => {
      let newState;

      context('for an existing lesson', () => {
        beforeEach(() => {
          const lesson = { title: 'English 101', students: [], id: 'lesson-1' };
          state = fromJS({ lessons: [ lesson ] });

          newState = coreReducer(state, {
            type: constants.SET_STUDENTS_FOR_LESSON,
            lesson: lesson,
            students: [
              { name: 'The Dude', id: 'student-1' },
              { name: 'Luke Skywalker', id: 'lesson-2' }
            ]
          });
        });

        it('sets the students on the lesson', () => {
          const expectedState = fromJS({
            lessons: [{
              id: 'lesson-1',
              title: 'English 101',
              students: [
                { name: 'The Dude', id: 'student-1' },
                { name: 'Luke Skywalker', id: 'lesson-2' }
              ]
            }]
          });

          expect( newState ).to.equal( expectedState );
        });
      });
      context('for a non existing lesson', () => {
        beforeEach(() => {
          const lesson = { title: 'English 101', students: [], id: 'lesson-1' };
          state = fromJS({ lessons: [] });

          newState = coreReducer(state, {
            type: constants.SET_STUDENTS_FOR_LESSON,
            lesson: lesson,
            students: [
              { name: 'The Dude', id: 'student-1' },
              { name: 'Luke Skywalker', id: 'lesson-2' }
            ]
          });
        });

        it('does not set the students on the lesson', () => {
          const expectedState = fromJS({ lessons: [] });

          expect( newState ).to.equal( expectedState );
        });
      });
    });

    describe('ADD_STUDENT_TO_LESSON', () => {
      let newState;

      context('for an existing lesson', () => {
        beforeEach(() => {
          const lesson = {
            id: 'lesson-1',
            title: 'English 101',
            students: [{ name: 'The Dude', id: 'student-1' }] };
          state = fromJS({ lessons: [ lesson ] });

          newState = coreReducer(state, {
            type: constants.ADD_STUDENT_TO_LESSON,
            lesson: lesson,
            student: { name: 'Luke Skywalker', id: 'lesson-2' }
          });
        });

        it('sets the students on the lesson', () => {
          const expectedState = fromJS({
            lessons: [{
              id: 'lesson-1',
              title: 'English 101',
              students: [
                { name: 'The Dude', id: 'student-1' },
                { name: 'Luke Skywalker', id: 'lesson-2' }
              ]
            }]
          });

          expect( newState ).to.equal( expectedState );
        });
      });
      context('for a non existing lesson', () => {
        beforeEach(() => {
          const lesson = { title: 'English 101', students: [], id: 'lesson-1' };
          state = fromJS({ lessons: [] });

          newState = coreReducer(state, {
            type: constants.ADD_STUDENT_TO_LESSON,
            lesson: lesson,
            student: { name: 'Luke Skywalker', id: 'lesson-2' }
          });
        });

        it('does not set the students on the lesson', () => {
          const expectedState = fromJS({ lessons: [] });

          expect( newState ).to.equal( expectedState );
        });
      });
    });
  });
});
