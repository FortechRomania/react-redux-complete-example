import React, { Component } from "react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";

export default function withAuthentication( WrappedComponent ) {
    class WithAuthentication extends Component {
        componentWillMount( ) {
            if ( !this.props.isAuthenticated ) {
                browserHistory.replace( "/login" );
            }
        }

        componentWillReceiveProps( ) {
            if ( !this.props.isAuthenticated ) {
                browserHistory.replace( "/login" );
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
    WithAuthentication.propTypes = {
        isAuthenticated: bool.isRequired,
    };

    const mapStateToProps = ( state ) => ( {
        isAuthenticated: state.session.isAuthenticated,
    } );

    return connect( mapStateToProps )( WithAuthentication );
}
