import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "../app/store";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state: RootState) => state.user.user);
  return currentUser ? <Outlet /> : <Navigate to="/auth/signin" />;
};

export default PrivateRoute;
