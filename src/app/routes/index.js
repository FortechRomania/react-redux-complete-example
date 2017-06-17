import { Home, Login, ProductDetails, ProductList, Cart, MyAccount } from "../views/pages";
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
        example: "/products/apple",
        component: ProductDetails,
        exact: true,
    },
    {
        path: "/cart",
        component: Cart,
        exact: true,
    },
    {
        path: "/myaccount",
        component: withAuthentication( MyAccount ),
        exact: true,
    },
    {
        path: "/login",
        component: Login,
        exact: true,
    },
];

export default routes;
