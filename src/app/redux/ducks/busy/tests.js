import expect from "expect.js";
import busyReducer from "./reducers";

const noCallInProgress = 0;
const oneCallInProgress = 1;
const twoCallsInProgress = 2;

const blocking = {
    type: "TEST",
    meta: {
        async: true,
        blocking: true,
    },
};

const blockingCompleted = {
    type: "TEST_COMPLETED",
    meta: {
        async: true,
        blocking: true,
    },
};

const blockingFailed = {
    type: "TEST_FAILED",
    meta: {
        async: true,
        blocking: true,
    },
};

const nonBlocking = {
    type: "TEST",
    meta: {
        async: true,
        blocking: false,
    },
};

const nonBlockingCompleted = {
    type: "TEST_COMPLETED",
    meta: {
        async: true,
        blocking: false,
    },
};

const nonBlockingFailed = {
    type: "TEST_FAILED",
    meta: {
        async: true,
        blocking: false,
    },
};

/* eslint-disable func-names */
describe( "busy reducer", function( ) {
    describe( "initial action", function( ) {
        context( "on general action", function( ) {
            context( "no api call running", function( ) {
                const result = busyReducer( noCallInProgress, blocking );

                it( "should increment the busy state", function( ) {
                    expect( result ).to.be( 1 );
                } );
            } );

            context( "another api call running", function( ) {
                const result = busyReducer( oneCallInProgress, blocking );

                it( "should increment the busy state", function( ) {
                    expect( result ).to.be( 2 );
                } );
            } );
        } );

        context( "on non blocking action", function( ) {
            context( "no api call running", function( ) {
                const result = busyReducer( noCallInProgress, nonBlocking );

                it( "should not increment the busy state", function( ) {
                    expect( result ).to.be( 0 );
                } );
            } );

            context( "another api call running", function( ) {
                const result = busyReducer( oneCallInProgress, nonBlocking );

                it( "should not increment the busy state", function( ) {
                    expect( result ).to.be( 1 );
                } );
            } );
        } );
    } );

    describe( "completed action", function( ) {
        context( "on general action", function( ) {
            context( "no api call running", function( ) {
                const result = busyReducer( oneCallInProgress, blockingCompleted );

                it( "should increment the busy state", function( ) {
                    expect( result ).to.be( 0 );
                } );
            } );

            context( "another api call running", function( ) {
                const result = busyReducer( twoCallsInProgress, blockingCompleted );

                it( "should increment the busy state", function( ) {
                    expect( result ).to.be( 1 );
                } );
            } );
        } );

        context( "on general blocking action", function( ) {
            context( "no api call running", function( ) {
                const result = busyReducer( noCallInProgress, nonBlockingCompleted );

                it( "should not increment the busy state", function( ) {
                    expect( result ).to.be( 0 );
                } );
            } );

            context( "another api call running", function( ) {
                const result = busyReducer( oneCallInProgress, nonBlockingCompleted );

                it( "should not increment the busy state", function( ) {
                    expect( result ).to.be( 1 );
                } );
            } );
        } );
    } );

    describe( "failed action", function( ) {
        context( "on general action", function( ) {
            context( "no api call running", function( ) {
                const result = busyReducer( oneCallInProgress, blockingFailed );

                it( "should increment the busy state", function( ) {
                    expect( result ).to.be( 0 );
                } );
            } );

            context( "another api call running", function( ) {
                const result = busyReducer( twoCallsInProgress, blockingFailed );

                it( "should increment the busy state", function( ) {
                    expect( result ).to.be( 1 );
                } );
            } );
        } );

        context( "on non blocking action", function( ) {
            context( "no api call running", function( ) {
                const result = busyReducer( noCallInProgress, nonBlockingFailed );

                it( "should not increment the busy state", function( ) {
                    expect( result ).to.be( 0 );
                } );
            } );

            context( "another api call running", function( ) {
                const result = busyReducer( oneCallInProgress, nonBlockingFailed );

                it( "should not increment the busy state", function( ) {
                    expect( result ).to.be( 1 );
                } );
            } );
        } );
    } );
} );
