import RxNode from 'rx-node';
import { createStore } from 'redux';
import * as actions from './actions';
import reducers from './reducers';
import {
    validateInput,
    validateMoveCommand,
    validatePlaceCommand
} from './validators';
import { COMMANDS } from './constants';

const [ PLACE, MOVE, LEFT, RIGHT, REPORT ] = COMMANDS;

const store = createStore(reducers);

// Observable listening on stdin
const subscription = RxNode.fromStream(process.stdin, 'end')
    .subscribe(function (chunk) {
        const params = getParamsFromChunk(chunk);
        const state = store.getState()
        if(validateInput(params, state)) {
            switch(params[0]) {
                case PLACE:
                    if(validatePlaceCommand(params)) {
                        const [ command, x, y, facing ] = params;
                        store.dispatch(actions.place(x, y, facing));
                    }
                    break;
                case MOVE:
                    if(validateMoveCommand(state)) {
                        store.dispatch(actions.move());
                    }
                    break;
                case LEFT:
                    store.dispatch(actions.left());
                    break;
                case RIGHT:
                    store.dispatch(actions.right());
                    break;
                case REPORT:
                    store.dispatch(actions.report(state));
                    break;
                default:
                    console.log(ERRORS.invalidCommand(command));
            }
        }
        console.log(state.toJS());
    });

function getParamsFromChunk(chunk) {
    const input = chunk.toString('utf8').split(' ');
    const command = input[0];
    let params;
    if(input[1]) {
        params = input[1].trim();
        params = [ command, ...params.split(',') ];
    } else {
        params = [ command.trim() ];
    }
    console.log(JSON.stringify(params));
    return params;
}
