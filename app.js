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
        const params = chunk.toString('utf8').split(' ');
        params[params.length-1] = params[params.length-1].trim(); // remove new line char
        const state = store.getState()
        if(validateInput(params, state)) {
            switch(params[0]) {
                case PLACE:
                    if(validatePlaceCommand(params)) {
                        const [ command, x, y, direction ] = params;
                        store.dispatch(actions.place(x, y, direction));
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
    });
