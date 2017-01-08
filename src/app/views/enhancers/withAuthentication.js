import React, { Component } from "react";
import { connect } from "react-redux";

export default function withAuthentication( WrappedComponent ) {
    class Wrapper extends Component {
        componentWillMount( ) {
            if ( !this.props.isAuthenticated ) {
                // redirect
            }
        }

        componentWillReceiveProps( ) {
            if ( !this.props.isAuthenticated ) {
                // redirect
            }
        }

        render( ) {
            if ( !this.props.isAuthenticated ) {
                return false;
            }

            return ( <WrappedComponent { ...this.props } /> );
        }
    }

    const { bool } = React.PropTypes;
    Wrapper.propTypes = {
        isAuthenticated: bool.isRequired,
    };

    const mapStateToProps = ( state ) => ( {
        isAuthenticated: state.session.isAuthenticated,
    } );

    return connect( mapStateToProps )( Wrapper );
}
