import React from "react";
import { Route, IndexRoute } from "react-router";

import { Home, ProductList } from "../pages";
import { App } from "../layouts";

export default (
    <Route path="/" component={ App }>
        <IndexRoute component={ Home } />
        <Route path="/products" component={ ProductList } />
    </Route>
);
