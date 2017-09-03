import * as utils from "./utils";

const busyReducer = ( state = 0, action ) => {
    if ( utils.actionShouldBlock( action.meta ) ) {
        return state;
    }
    if ( utils.actionFinished( action.type ) ) {
        return state - 1;
    }
    return state + 1;
};

export default busyReducer;
