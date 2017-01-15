import expect from "expect.js";
import reducer from "./reducers";
import types from "./types";

describe( "session reducer", function( ) {
    describe( "login", function( ) {
        const action = {
            type: types.LOGIN,
        };

        const initialState = {
            isAuthenticated: false,
            redirectAfterLogin: "/products",
        };

        const result = reducer( initialState, action );

        it( "should authenticate the user", function( ) {
            expect( result.isAuthenticated ).to.be( true );
        } );

        it( "should not change the redirect after login url", function( ) {
            expect( result.redirectAfterLogin ).to.be( initialState.redirectAfterLogin );
        } );
    } );
} );
