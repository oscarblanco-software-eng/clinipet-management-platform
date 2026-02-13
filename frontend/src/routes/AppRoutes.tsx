import { Routes, Route } from "react-router-dom";

// Páginas públicas
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import ForgotPassword from "../pages/public/ForgotPassword";
import ResetPassword from "../pages/public/ResetPassword";
import Home from "../pages/public/home";
// Importar componente
// Páginas protegidas
import UserDashboard from "../pages/user/Dashboard";
import AdminDashboard from "../pages/admin/Dashboard";

// Componente de protección de rutas
import PrivateRoute from "../components/PrivateRoute";

// <- Aquí montamos las rutas de mascotas

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    {/* Rutas públicas */}
    <Route path="/home" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password/:token" element={<ResetPassword />} />

    {/* Rutas protegidas */}
    <Route
      path="/isUser"
      element={
        <PrivateRoute role="user">
          <UserDashboard />
        </PrivateRoute>
      }
    />
    <Route
      path="/isAdmin"
      element={
        <PrivateRoute role="admin">
          <AdminDashboard />
        </PrivateRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
