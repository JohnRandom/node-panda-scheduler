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
  });
});
