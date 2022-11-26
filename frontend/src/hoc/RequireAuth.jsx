import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useEffect } from "react";

const RequireAuth = ({ children }) => {
	const { signout, user, refresh } = useAuth();

	if (!user && !localStorage.getItem("token")) {
		return <Navigate to="/" />;
	}

	return children;
};

export { RequireAuth };
