import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Signin = () => {
	const [values, setValues] = useState({
		email: "usera@mail.ru",
		password: "12345",
	});

	const handleChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};
	const navigate = useNavigate();
	const { signin } = useAuth();

	const handlesubmit = (e) => {
		e.preventDefault();
		signin(values, () => navigate("/profile", { replace: true }));
	};

	return (
		<>
			<form onSubmit={handlesubmit}>
				<input
					type="text"
					name="email"
					value={values.email}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="password"
					value={values.password}
					onChange={handleChange}
				/>
				<button type="submit">submit</button>
			</form>
			<div>
				Already has an account?
				<Link to="/signup"> Sign up.</Link>
			</div>
		</>
	);
};

export { Signin };
