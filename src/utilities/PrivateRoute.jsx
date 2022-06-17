import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const PrivateRoute = ({ children }) => {
    const { user } = useAuthContext();
    
    return user ? children : <Navigate to="/login" />;
}