// Action Types
export const PLACE = 'PLACE';
export const MOVE = 'MOVE';
export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';
export const REPORT = 'REPORT';

// Action Creators
export const place = (x, y, direction) => {
    return {
        type: PLACE,
        payload: {
            x,
            y,
            direction
        }
    };
};

export const move = () => {
    return {
        type: MOVE
    };
};

export const left = () => {
    return {
        type: LEFT
    };
};

export const right = () => {
    return {
        type: RIGHT
    };
};

export const report = (state) => {
    console.log(`Output: ${state.get('x')}, ${state.get('y')}, ${state.get('direction')}`)
};
