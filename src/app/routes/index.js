import React from "react";
import { Route, IndexRoute } from "react-router";
import { App } from "../views/layouts";
import { Home, Login, ProductDetails, ProductList, Cart } from "../views/pages";
import { withAuthentication } from "../views/enhancers";

const routes = (
    <Route path="/" component={ App }>
        <IndexRoute component={ Home } />
        <Route path="/products" component={ ProductList } />
        <Route path="/products/:permalink" component={ ProductDetails } />
        <Route path="/cart" component={ withAuthentication( Cart ) } />
        <Route path="/login" component={ Login } />
    </Route>
);

export default routes;
