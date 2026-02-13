import { Navigate } from "react-router-dom";

import type { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
  role: "admin" | "user";
}


const PrivateRoute = ({ children, role }: PrivateRouteProps) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  const parsedUser = JSON.parse(user);

  if (parsedUser.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
