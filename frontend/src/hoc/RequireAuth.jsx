import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RequireAuth = ({ children }) => {
	const location = useLocation;
	const { user } = useAuth();
	if (!user && !localStorage.getItem("token")) {
		return <Navigate to="/" />;
	}

	return children;
};

export { RequireAuth };
