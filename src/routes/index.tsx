import * as Pages from "@/pages";

export const routes = [
  // Home
  { path: "/", component: <Pages.Home /> },

  // Contact
  { path: "/contact", component: <Pages.Contact /> },

    // Shop
  { path: "/products", component: <Pages.Shop /> },

    // Procut Detail
  { path: "/products/:id", component: <Pages.ProductDetail /> },

  //Login
  { path: "/auth/login", component: <Pages.Login /> },

  //Register
  { path: "/auth/register", component: <Pages.Register /> },  

  //Account / Account detail
  {path:"/account/details", component: <Pages.AccountDetails/>},

  //Account / Wishlist
  {path:"/account/wishlist", component: <Pages.Wishlist/>}


];

export default routes;
