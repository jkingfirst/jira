import Login from "pages/unAuthenticatedApp";
import Register from "pages/unAuthenticatedApp/register";
export default [
  {
    path: "/login",
    element: <Login />,
    label: "登录",
    hideInMenu: true,
    index: true,
  },
];
