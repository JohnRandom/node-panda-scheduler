import { coreReducer } from '../app/reducers';
import constants from '../app/constants';
import { expect } from 'chai';
import { fromJS } from 'immutable';


describe('Reducer', () => {
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
        const state = fromJS({
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
        const state = fromJS({
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
          const state = fromJS({ lessons: [ lesson ] });

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
          const state = fromJS({ lessons: [] });

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
          const state = fromJS({ lessons: [ lesson ] });

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
          const state = fromJS({ lessons: [] });

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
