import { expect } from 'chai';
import {
    getActiveState,
    getInitialState
} from './mocks';
import { Map } from 'immutable';
import reducers from '../src/reducers';

const state = getInitialState();
const activeState = getActiveState();

describe('REDUCERS:', () => {
    it('should return initial state when passed undefined state.', () => {
        expect(reducers(undefined, null)).to.deep.equal(state);
    });
    it('should return the given state when action is falsy, invalid or isn\'t handled.', () => {
        expect(reducers(activeState, null)).to.deep.equal(activeState);
        expect(reducers(activeState, undefined)).to.deep.equal(activeState);
        expect(reducers(activeState, 0)).to.deep.equal(activeState);
        expect(reducers(activeState, {})).to.deep.equal(activeState);
        expect(reducers(activeState, { type: 'INVALID' })).to.deep.equal(activeState);
    });
    it('should set the state for PLACE command.', () => {
        const action = {
            type: 'PLACE',
            payload: {
                x: '2',
                y: '2',
                facing: 'NORTH'
            }
        }
        expect(
            reducers(state, action).toJS()
        ).to.deep.equal({
            onTable: true,
            x: 2,
            y: 2,
            facing: 'NORTH'
        });
    });
    describe('should increment or decrement in the correct direction for the given MOVE command.', () => {
        const moveAction = {
            type: 'MOVE'
        }
        let moveState;
        beforeEach(() => {
            moveState = getActiveState();
        });
        it('should increment Y when facing NORTH.', () => {
            expect(
                reducers(moveState, moveAction).toJS()
            ).to.deep.equal({
                onTable: true,
                x: 2,
                y: 3,
                facing: 'NORTH'
            });
        });
        it('should increment X when facing EAST.', () => {
            expect(
                reducers(moveState.set('facing', 'EAST'), moveAction).toJS()
            ).to.deep.equal({
                onTable: true,
                x: 3,
                y: 2,
                facing: 'EAST'
            });
        });
        it('should decrement Y when facing SOUTH.', () => {
            expect(
                reducers(moveState.set('facing', 'SOUTH'), moveAction).toJS()
            ).to.deep.equal({
                onTable: true,
                x: 2,
                y: 1,
                facing: 'SOUTH'
            });
        });
        it('should decrement X when facing WEST.', () => {
            expect(
                reducers(moveState.set('facing', 'WEST'), moveAction).toJS()
            ).to.deep.equal({
                onTable: true,
                x: 1,
                y: 2,
                facing: 'WEST'
            });
        });
    });
    it('should rotate the facing direction clockwise for the RIGHT command.', () => {
        const turnAction = { type: 'RIGHT' };
        expect(
            reducers(activeState, turnAction).toJS()
        ).to.deep.equal({
            onTable: true,
            x: 2,
            y: 2,
            facing: 'EAST'
        });
    });
    it('should roll the facing direction around from WEST to NORTH for the RIGHT command.', () => {
        const turnAction = { type: 'RIGHT' };
        expect(
            reducers(activeState.set('facing', 'WEST'), turnAction).toJS()
        ).to.deep.equal({
            onTable: true,
            x: 2,
            y: 2,
            facing: 'NORTH'
        });
    });
    it('should rotate the facing direction anti-clockwise for the LEFT command.', () => {
        const turnAction = { type: 'LEFT' };
        expect(
            reducers(activeState.set('facing', 'EAST'), turnAction).toJS()
        ).to.deep.equal({
            onTable: true,
            x: 2,
            y: 2,
            facing: 'NORTH'
        });
    });
    it('should roll the facing direction around from NORTH to WEST for the LEFT command.', () => {
        const turnAction = { type: 'LEFT' };
        expect(
            reducers(activeState, turnAction).toJS()
        ).to.deep.equal({
            onTable: true,
            x: 2,
            y: 2,
            facing: 'WEST'
        });
    });
});
