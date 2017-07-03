import React, { Component } from "react";
import { object } from "prop-types";

class LazyLoad extends Component {
    componentWillMount() {
        this.props.load.then( comp => {
            this.comp = comp;
            this.forceUpdate();
        } );
    }
    render() {
        return this.comp ? <this.comp.default /> : null;
    }
}

LazyLoad.propTypes = {
    load: object, // eslint-disable-line
};

export default ( dynamicImport ) => ( ) => (
    <LazyLoad load={ dynamicImport( ) } />
);
