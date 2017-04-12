import { Map } from 'immutable';

export const getInitialState = () => Map({
    onTable: false,
    x: null,
    y: null,
    direction: null
});

export const getActiveState = () => Map({
    onTable: true,
    x: 2,
    y: 2,
    direction: 'NORTH'
});
