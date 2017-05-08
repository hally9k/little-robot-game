import ERRORS from './errors';
import {
    COMMANDS,
    DIRECTIONS
} from './constants';
const [ PLACE, MOVE ] = COMMANDS;
const [ NORTH, EAST, SOUTH, WEST ] = DIRECTIONS;

export function validateInput(params, state) {
    const errors = [];
    if(params.length === 0) {
        console.log(ERRORS.noParams());
        return false;
    }
    const command = params[0];
    if(!COMMANDS.includes(command)) {
        errors.push(ERRORS.invalidCommand(command));
    }
    else if(command !== PLACE && !state.get('onTable'))
    {
        errors.push(ERRORS.hasntYetPlaced(command))
    }
    errors.forEach((error) => { console.log(error) });

    return errors.length === 0;
}


export function validatePlaceCommand(params) {
    const errors = [];

    if(params.length !== 4) {
        console.log(ERRORS.incorrectNumberOfParams(params));
        return false;
    }

    const x = parseInt(params[1]);
    const y = parseInt(params[2]);
    const facing = params[3];

    if(isNaN(x) || x < 0 || x > 4) {
        errors.push(ERRORS.invalidX(x));
    }
    if(isNaN(y) || y < 0 || y > 4) {
        errors.push(ERRORS.invalidY(y));
    }
    if(!DIRECTIONS.includes(facing)) {
        errors.push(ERRORS.invalidDirection(facing));
    }

    errors.forEach((error) => { console.log(error) });
    return errors.length === 0;
}

export function validateMoveCommand(state) {
    const errors = [];

    const x = state.get('x');
    const y = state.get('y');
    const facing = state.get('facing');
    switch(facing) {
        case NORTH:
            if(y >= 4) errors.push(ERRORS.invalidMove(facing));
            break;
        case EAST:
            if(x >= 4) errors.push(ERRORS.invalidMove(facing));
            break;
        case SOUTH:
            if(y <= 0) errors.push(ERRORS.invalidMove(facing));
            break;
        case WEST:
            if(x <= 0) errors.push(ERRORS.invalidMove(facing));
            break;
        default:
            console.log(ERRORS.fatalApplicationState(state));
    }

    errors.forEach((error) => { console.log(error) });
    return errors.length === 0;
}
