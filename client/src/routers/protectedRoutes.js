import { Routes, Route, Navigate } from "react-router-dom";
import AddNewItemPage from "../views/AddNewItemPage";
import AddNewTypePage from "../views/AddNewTypePage";
import HomePage from "../views/HomePage";
import ItemDetailPage from "../views/ItemDetailPage";
import TypePage from "../views/TypePage";
import EditItemPage from "../views/EditItemPage";
import EditTypePage from "../views/EditTypePage";
import AddStockPage from "../views/AddStockPage";
import AddStockBuyingPage from "../views/AddStockBuyingPage";

const access_token = localStorage.getItem("access_token");
const authenticated = !!access_token;

const ProtectedRoute = () => {
  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/items/:id" element={<ItemDetailPage />} />
      <Route path="/additem" element={<AddNewItemPage />} />
      <Route path="/types" element={<TypePage />} />
      <Route path="/addtype" element={<AddNewTypePage />} />
      <Route path="/addstock/:id" element={<AddStockPage />} />
      <Route path="/edititem/:id" element={<EditItemPage />} />
      <Route path="/edittype/:id" element={<EditTypePage />} />
      <Route path="/addbuying/:id" element={<AddStockBuyingPage />} />
    </Routes>
  );
};

export default ProtectedRoute;
