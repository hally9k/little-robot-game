import { Map } from 'immutable';
import {
    COMMANDS,
    DIRECTIONS
} from './constants';
const [ PLACE, MOVE, LEFT, RIGHT, REPORT ] = COMMANDS;
const [ NORTH, EAST, SOUTH, WEST ] = DIRECTIONS;

// Initial state object
const INITIAL_STATE = Map({
    onTable: false,
    x: null,
    y: null,
    facing: null
});

// Reducers
export default (state = INITIAL_STATE, action) => {
    if(!action || !action.type) return state;
    switch(action.type) {
        case PLACE:
            return placeReducer(state, action);
        case MOVE:
            return moveReducer(state, action);
        case LEFT:
            return leftReducer(state, action);
        case RIGHT:
            return rightReducer(state, action);
        case REPORT:
            // Doesn't affect state
        default:
            return state;
    }
}

export const placeReducer = (state, action) => {
    const { x, y, facing } = action.payload;
    return state
            .set('x', parseInt(x))
            .set('y', parseInt(y))
            .set('facing', facing)
            .set('onTable', true);
}

export const moveReducer = (state, action) => {
    const x = state.get('x');
    const y = state.get('y');
    const facing = state.get('facing');
    switch(facing) {
        case NORTH:
            return state.set('y', y + 1);
        case EAST:
            return state.set('x', x + 1);
        case SOUTH:
            return state.set('y', y - 1);
        case WEST:
            return state.set('x', x - 1);
        default:
            return state;
    }
}

export const leftReducer = (state, action) => {
    const facing = state.get('facing');
    let index = DIRECTIONS.indexOf(facing);
    return state.set('facing', DIRECTIONS[index === 0 ? 3 : --index]);
}

export const rightReducer = (state, action) => {
    const facing = state.get('facing');
    let index = DIRECTIONS.indexOf(facing);
    return state.set('facing', DIRECTIONS[index === 3 ? 0 : ++index]);
}
