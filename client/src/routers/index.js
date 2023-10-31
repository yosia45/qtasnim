import { createBrowserRouter, redirect } from "react-router-dom";
import LoginRegisterPage from "../views/LoginRegisterPage";
import AddNewItemPage from "../views/AddNewItemPage";
import AddNewTypePage from "../views/AddNewTypePage";
import HomePage from "../views/HomePage";
import ItemDetailPage from "../views/ItemDetailPage";
import TypePage from "../views/TypePage";
import EditItemPage from "../views/EditItemPage";
import EditTypePage from "../views/EditTypePage";
import AddStockPage from "../views/AddStockPage";
import AddStockBuyingPage from "../views/AddStockBuyingPage";

const authn = () => {
  const access_token = localStorage.getItem("access_token");
  if (!access_token) return redirect("/login");
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    loader: authn,
  },
  {
    path: "items/:id",
    element: <ItemDetailPage />,
    loader: authn,
  },
  {
    path: "additem",
    element: <AddNewItemPage />,
    loader: authn,
  },
  {
    path: "types",
    element: <TypePage />,
    loader: authn,
  },
  {
    path: "addtype",
    element: <AddNewTypePage />,
    loader: authn,
  },
  {
    path: "addstock/:id",
    element: <AddStockPage />,
    loader: authn,
  },
  {
    path: "addbuying/:id",
    element: <AddStockBuyingPage />,
    loader: authn,
  },
  {
    path: "edititem/:id",
    element: <EditItemPage />,
    loader: authn,
  },
  {
    path: "edittype/:id",
    element: <EditTypePage />,
    loader: authn,
  },
  {
    path: "/login",
    element: <LoginRegisterPage />,
  },
]);

export default router;
