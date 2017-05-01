import { Home, Login, ProductDetails, ProductList, Cart } from "../views/pages";
import { withAuthentication } from "../views/enhancers";

const routes = [
    {
        path: "/",
        component: Home,
        exact: true,
    },
    {
        path: "/products",
        component: ProductList,
        exact: true,
    },
    {
        path: "/products/:permalink",
        component: ProductDetails,
        exact: true,
    },
    {
        path: "/cart",
        component: withAuthentication( Cart ),
        exact: true,
    },
    {
        path: "/login",
        component: Login,
        exact: true,
    },
];

export default routes;
