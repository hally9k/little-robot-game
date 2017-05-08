import { expect } from 'chai';
import {
    getActiveState,
    getInitialState
} from './mocks';
import {
    validateInput,
    validateMoveCommand,
    validatePlaceCommand
} from '../src/validators';

const state = getInitialState();
let moveState;

describe('VALIDATORS:', () => {

    describe('INPUT VALIDATOR:', () => {
        it('should reject no commands.', () => {
            const params = [];
            expect(validateInput(params, state)).to.be.false;
        });
        it('should reject invalid commands.', () => {
            const params = [ 'INVALID_COMMAND' ];
            expect(validateInput(params, state)).to.be.false;
        });
        it('should reject all commands except PLACE when te robot isn\'t on the table yet.', () => {
            const params = [ 'MOVE' ];
            expect(validateInput(params, state)).to.be.false;
        });
        it('should accept all valid command types', () => {
            expect(validateInput([ 'PLACE' ], state)).to.be.true;
            const activeState = getActiveState();
            expect(validateInput([ 'MOVE' ], activeState)).to.be.true;
            expect(validateInput([ 'LEFT' ], activeState)).to.be.true;
            expect(validateInput([ 'RIGHT' ], activeState)).to.be.true;
            expect(validateInput([ 'REPORT' ], activeState)).to.be.true;
        });
    });

    describe('PLACE VALIDATOR:', () => {
        it('should reject any more or less that 3 parameters', () => {
            const params = [
                'PLACE',
                '1',
                '2',
                'NORTH',
                'EXTRA_PARAM'
            ];
            expect(validatePlaceCommand(params, state)).to.be.false;
        });
        it('should reject an X value that is not a number.', () => {
            const params = [
                'PLACE',
                'THIS_IS_NaN',
                '2',
                'NORTH'
            ];
            expect(validatePlaceCommand(params, state)).to.be.false;
        });
        it('should reject an Y value that is not a number.', () => {
            const params = [
                'PLACE',
                '2',
                'THIS_IS_NaN',
                'NORTH'
            ];
            expect(validatePlaceCommand(params, state)).to.be.false;
        });
        it('should reject an X value that is higher than 4.', () => {
            const params = [
                'PLACE',
                '5',
                '2',
                'NORTH'
            ];
            expect(validatePlaceCommand(params, state)).to.be.false;
        });
        it('should reject an X value that is lower than 0.', () => {
            const params = [
                'PLACE',
                '-1',
                '2',
                'NORTH'
            ];
            expect(validatePlaceCommand(params, state)).to.be.false;
        });
        it('should reject an Y value that is higher than 4.', () => {
            const params = [
                'PLACE',
                '2',
                '5',
                'NORTH'
            ];
            expect(validatePlaceCommand(params, state)).to.be.false;
        });
        it('should reject an Y value that is lower than 0.', () => {
            const params = [
                'PLACE',
                '2',
                '-1',
                'NORTH'
            ];
            expect(validatePlaceCommand(params, state)).to.be.false;
        });
        it('should reject an invalid facing.', () => {
            const params = [
                'PLACE',
                '2',
                '2',
                'INVALID_DIRECTION'
            ];
            expect(validatePlaceCommand(params, state)).to.be.false;
        });
    });


    describe('MOVE VALIDATOR:', () => {
        beforeEach(() => {
            moveState = getActiveState();
        })
        it('should reject a move that breaches the NORTH boundry.', () => {
            expect(
                validateMoveCommand(
                    moveState
                        .set('facing', 'NORTH')
                        .set('y', 4)
                )
            ).to.be.false;
        });
        it('should reject a move that breaches the EAST boundry.', () => {
            expect(
                validateMoveCommand(
                    moveState
                        .set('facing', 'EAST')
                        .set('x', 4)
                )
            ).to.be.false;
        });
        it('should reject a move that breaches the SOUTH boundry.', () => {
            expect(
                validateMoveCommand(
                    moveState
                        .set('facing', 'SOUTH')
                        .set('y', 0)
                )
            ).to.be.false;
        });
        it('should reject a move that breaches the WEST boundry.', () => {
            expect(
                validateMoveCommand(
                    moveState
                        .set('facing', 'WEST')
                        .set('x', 0)
                )
            ).to.be.false;
        });
    });

});
