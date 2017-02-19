import { fetch } from "../utils";

const baseUrl = typeof document === "undefined" ? "http://localhost:7777/api" : "/api";

const apiService = ( ) => ( next ) => ( action ) => {
    const result = next( action );
    if ( !action.meta || !action.meta.async ) {
        return result;
    }

    const { path, method = "GET", body } = action.meta;

    if ( !path ) {
        throw new Error( `'path' not specified for async action ${ action.type }` );
    }

    const url = `${ baseUrl }${ path }`;

    return fetch( url, method, body ).then(
        res => handleResponse( res, action, next ),
        err => handleErrors( err, action, next ),
    );
};

export default apiService;

function handleErrors( err, action, next ) {
    next( {
        type: `${ action.type }_FAILED`,
        payload: err,
        meta: action.meta,
    } );

    return Promise.reject( err );
}

function handleResponse( res, action, next ) {
    next( {
        type: `${ action.type }_COMPLETED`,
        payload: res,
        meta: action.meta,
    } );

    return res;
}
