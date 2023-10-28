import { createBrowserRouter } from "react-router-dom";
import AddNewItemPage from "../views/AddNewItemPage";
import AddNewTypePage from "../views/AddNewTypePage";
import HomePage from "../views/HomePage";
import ItemDetailPage from "../views/ItemDetailPage";
import TypePage from "../views/TypePage";
import EditItemPage from "../views/EditItemPage";
import EditTypePage from "../views/EditTypePage";
import AddStockPage from "../views/AddStockPage";
import AddStockBuyingPage from "../views/AddStockBuyingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/items/:id",
    element: <ItemDetailPage />,
  },
  {
    path: "/additem",
    element: <AddNewItemPage />,
  },
  {
    path: "/types",
    element: <TypePage />,
  },
  {
    path: "/addtype",
    element: <AddNewTypePage />,
  },
  {
    path: "/addstock/:id",
    element: <AddStockPage />,
  },
  {
    path: "/edititem/:id",
    element: <EditItemPage />,
  },
  {
    path: "/edittype/:id",
    element: <EditTypePage />,
  },
  {
    path: "/addbuying/:id",
    element: <AddStockBuyingPage />,
  },
]);

export default router;
