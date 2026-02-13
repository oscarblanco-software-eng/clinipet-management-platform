import { Navigate } from "react-router-dom";

import type { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
  role: "admin" | "user";
}

const PrivateRoute = ({ children, role }: PrivateRouteProps) => {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  // Si no hay token o usuario, redirige a login
  if (!token || !userData) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userData);

    // Si el rol no coincide, redirige a página de acceso denegado
    if (user.role !== role) {
      return <Navigate to="/unauthorized" replace />;
    }

    // Usuario autorizado
    return children;
  } catch  {
    // Si hay error al parsear usuario, limpiar localStorage y redirigir
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
