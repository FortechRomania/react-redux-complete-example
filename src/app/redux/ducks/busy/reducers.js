const busyReducer = ( state = 0, action ) => {
    if ( !action.meta || !action.meta.async || !action.meta.blocking ) {
        return state;
    }

    if ( action.type.includes( "_COMPLETED" ) || action.type.includes( "_FAILED" ) ) {
        return state - 1;
    }

    return state + 1;
};

export default busyReducer;
