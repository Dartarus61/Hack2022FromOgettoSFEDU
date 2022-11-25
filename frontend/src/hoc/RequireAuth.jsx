import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RequireAuth = ({ children }) => {
	const location = useLocation;
	const { user } = useAuth();
	console.log(user);
	if (!user) {
		return <Navigate to="/" />;
	}

	return children;
};

export { RequireAuth };
