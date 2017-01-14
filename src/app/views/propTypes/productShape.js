import React from "react";

const { number, shape, string } = React.PropTypes;

export default shape( {
    id: number.isRequired,
    name: string.isRequired,
    permalink: string.isRequired,
    price: number.isRequired,
    stock: number.isRequired,
} );
