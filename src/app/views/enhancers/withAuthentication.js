import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

export default function withAuthentication( WrappedComponent ) {
    const Wrapper = ( { isAuthenticated } ) => {
        if ( !isAuthenticated ) {
            return ( <Redirect to="/login" /> );
        }

        return ( <WrappedComponent { ...this.props } /> );
    };

    const { bool } = React.PropTypes;
    Wrapper.propTypes = {
        isAuthenticated: bool.isRequired,
    };

    const mapStateToProps = ( state ) => ( {
        isAuthenticated: state.session.isAuthenticated,
    } );

    return connect( mapStateToProps )( Wrapper );
}
