import {
  setTeachers,
  addTeacher,
  setLessons,
  addLesson,
  setStudentsForLesson,
  addStudentToLesson
} from '../app/actions';
import constants from '../app/constants';
import { expect } from 'chai';


describe('Actions', () => {
  let action;

  describe('setTeachers', () => {
    beforeEach(() => {
      action = setTeachers([ {name: 'Bertha Smith', id: 'teacher-1'} ]);
    });

    it('returns a correctly formatted action', () => {
      const expectedAction = {
        type: constants.SET_TEACHERS,
        teachers: [ {name: 'Bertha Smith', id: 'teacher-1'} ]
      };

      expect( action ).to.deep.equal( expectedAction );
    });
  });

  describe('addTeacher', () => {
    beforeEach(() => {
      action = addTeacher( {name: 'Bertha Smith', id: 'teacher-1'} );
    });

    it('returns a correctly formatted action', () => {
      const expectedAction = {
        type: constants.ADD_TEACHER,
        teacher: {name: 'Bertha Smith', id: 'teacher-1'}
      };

      expect( action ).to.deep.equal( expectedAction );
    });
  });

  describe('setLessons', () => {
    beforeEach(() => {
      action = setLessons([ {title: 'English 101', id: 'lesson-1'} ]);
    });

    it('returns a correctly formatted action', () => {
      const expectedAction = {
        type: constants.SET_LESSONS,
        lessons: [ {title: 'English 101', id: 'lesson-1'} ]
      };

      expect( action ).to.deep.equal( expectedAction );
    });
  });

  describe('addLesson', () => {
    beforeEach(() => {
      action = addLesson( {title: 'English 101', id: 'lesson-1'} );
    });

    it('returns a correctly formatted action', () => {
      const expectedAction = {
        type: constants.ADD_LESSON,
        lesson: {title: 'English 101', id: 'lesson-1'}
      };

      expect( action ).to.deep.equal( expectedAction );
    });
  });

  describe('setStudentsForLesson', () => {
    beforeEach(() => {
      action = setStudentsForLesson(
        {title: 'English 101', id: 'lesson-1'},
        [
          {name: 'The Dude', id: 'student-1'},
          {name: 'Luke Skywalker', id: 'student-2'}
        ]
      );
    });

    it('returns a correctly formatted action', () => {
      const expectedAction = {
        type: constants.SET_STUDENTS_FOR_LESSON,
        lesson: {title: 'English 101', id: 'lesson-1'},
        students: [
          {name: 'The Dude', id: 'student-1'},
          {name: 'Luke Skywalker', id: 'student-2'}
        ]
      };

      expect( action ).to.deep.equal( expectedAction );
    });
  });

  describe('addStudentToLesson', () => {
    beforeEach(() => {
      action = addStudentToLesson(
        {title: 'English 101', id: 'lesson-1'},
        {name: 'The Dude', id: 'student-1'}
      );
    });

    it('returns a correctly formatted action', () => {
      const expectedAction = {
        type: constants.ADD_STUDENT_TO_LESSON,
        lesson: {title: 'English 101', id: 'lesson-1'},
        student: {name: 'The Dude', id: 'student-1'}
      };

      expect( action ).to.deep.equal( expectedAction );
    });
  });
});
