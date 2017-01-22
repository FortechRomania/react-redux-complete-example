import React from "react";

const fetchBefore = ( dispatch, Component ) => ( matchProps ) => {
    dispatch( Component.prefetch( ) );
    return ( <Component { ...matchProps } /> );
};

export default fetchBefore;
