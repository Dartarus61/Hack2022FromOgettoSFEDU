import React, { useAuth } from "../hooks/useAuth";
import { Navigate  } from "react-router-dom";

const Validate = () => {
	const { user } = useAuth();
	if (!user) {
		return <Navigate to="/" />;
	}
	return <div>Validation letter was send to {user}</div>;
};

export default Validate;
