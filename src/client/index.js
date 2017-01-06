import React from "react";
import Home from "../app/views/pages/home";

import { render } from "react-dom";

const rootHtml = (
    <Home />
);

render( rootHtml, document.getElementById( "react-root" ) );
