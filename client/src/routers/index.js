import { createBrowserRouter } from "react-router-dom";
import AddNewItemPage from "../views/AddNewItemPage";
import AddNewTypePage from "../views/AddNewTypePage";
import HomePage from "../views/HomePage";
import EditItemPage from "../views/EditItemPage";
import EditTypePage from "../views/EditTypePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/additem",
    element: <AddNewItemPage />,
  },
  {
    path: "/addtype",
    element: <AddNewTypePage />,
  },
  {
    path: "/edititem/:id",
    element: <EditItemPage />,
  },
  {
    path: "/edittype/:id",
    element: <EditTypePage />,
  },
]);

export default router;
