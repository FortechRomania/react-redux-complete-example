import expect from "expect.js";
import reducer from "./reducers";
import * as types from "./types";

const product = {
    id: 1,
    name: "Test",
    permalink: "test",
};

/* eslint-disable func-names */
describe( "cart reducer", function( ) {
    describe( "add to cart", function( ) {
        const action = {
            type: types.ADD,
            payload: {
                product,
                quantity: 10,
            },
        };

        context( "empty cart", function( ) {
            const initialState = [ ];

            const result = reducer( initialState, action );

            it( "should add the product in the cart", function( ) {
                expect( result.length ).to.be( 1 );
                expect( result[ 0 ].product.id ).to.be( product.id );
                expect( result[ 0 ].quantity ).to.be( 10 );
            } );
        } );

        context( "cart has one item", function( ) {
            const initialState = [ {
                product: {
                    id: 2,
                    name: "Existing product",
                },
                quantity: 4,
            } ];

            const result = reducer( initialState, action );

            it( "should add the product in the cart", function( ) {
                expect( result.length ).to.be( 2 );
            } );

            it( "should add the product in the first position", function( ) {
                expect( result[ 0 ].product.id ).to.be( product.id );
                expect( result[ 0 ].quantity ).to.be( 10 );
            } );
        } );

        context( "cart has the same product already", function( ) {
            const initialState = [ {
                product: {
                    id: 1,
                    name: "Test",
                },
                quantity: 10,
            } ];

            const result = reducer( initialState, action );

            it( "should not add the same product in the cart", function( ) {
                expect( result.length ).to.be( 1 );
            } );

            it( "should increase the quantity", function( ) {
                expect( result[ 0 ].product.id ).to.be( product.id );
                expect( result[ 0 ].quantity ).to.be( 20 );
            } );
        } );
    } );
} );
