import expect from "expect.js";
import reducer from "./reducers";
import * as types from "./types";

/* eslint-disable func-names */
describe( "product reducer", function( ) {
    describe( "fetch product", function( ) {
        const action = {
            type: types.FETCH_DETAILS_COMPLETED,
            payload: {
                product: {
                    id: 1,
                    name: "Test",
                    permalink: "test",
                },
            },
        };

        const initialState = {
            list: [ ],
            details: null,
        };

        const result = reducer( initialState, action );

        it( "should set the product in the state", function( ) {
            expect( result.details.id ).to.be( 1 );
            expect( result.details.name ).to.be( "Test" );
            expect( result.details.permalink ).to.be( "test" );
        } );
    } );
} );
