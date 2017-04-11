import {
    COMMANDS,
    DIRECTIONS
} from './constants';

// Errors
export default {
    noParams: () => `You seem to have failed to enter a command. Valid commands include ${COMMANDS.join(', ')}`,
    hasntYetPlaced: (command) => `The command "${command}" is not valid. You must PLACE the robot before calling any other command.`,
    incorrectNumberOfParams: (params) => `The PLACE command takes the following parameters: X(int), Y(int), DIRECTON(string). You entered "${params.join(' ')}"`,
    invalidCommand: command => `The command "${command}" is not recognised. Valid commands include ${COMMANDS.join(', ')}`,
    invalidX: x => `The X value "${x}" is not valid. X must be an integer between 1 and 5.`,
    invalidY: y => `The Y value "${y}" is not valid. Y must be an integer between 1 and 5.`,
    invalidDirection: direction => `The direction "${direction}" is not valid. Valid directions include ${DIRECTIONS.join(', ')}.`,
    invalidMove: direction => `Moving ${direction} would send the robot over the edge!`,
    fatalApplicationState: state => `The application state is in a baaad place. ${JSON.stringify(state.toJS())}`
}
