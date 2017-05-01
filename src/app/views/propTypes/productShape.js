import PropTypes from "prop-types";

const { number, shape, string } = PropTypes;

export default shape( {
    id: number.isRequired,
    name: string.isRequired,
    permalink: string.isRequired,
    price: number.isRequired,
    stock: number.isRequired,
} );
