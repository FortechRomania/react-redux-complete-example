import types from "./types";

export const fetchDetails = ( ) => ( {
    type: types.FETCH_DETAILS,
} );

export const fetchList = ( ) => ( {
    type: types.FETCH_LIST,
} );

export default {
    fetchDetails,
    fetchList,
};
