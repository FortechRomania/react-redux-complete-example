import * as types from "./types";

export const fetchDetails = ( permalink ) => ( {
    type: types.FETCH_DETAILS,
    meta: {
        async: true,
        blocking: true,
        path: `/products/${ permalink }`,
        method: "GET",
    },
} );

export const fetchList = ( ) => ( {
    type: types.FETCH_LIST,
    meta: {
        async: true,
        blocking: true,
        path: "/products",
        method: "GET",
    },
} );
