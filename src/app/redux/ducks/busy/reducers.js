function getMeta( meta ) {
    return !meta || !meta.async || !meta.blocking;
}

function getType ( type ) {
    return type.includes( "_COMPLETED" ) || type.includes( "_FAILED" );
}

const busyReducer = ( state = 0, action ) => {
    if ( getMeta( action.meta ) ) {
        return state;
    }
    if ( getType( action.type ) ) {
        return state - 1;
    }
    return state + 1;
};

export default busyReducer;
