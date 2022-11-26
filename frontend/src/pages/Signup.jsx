import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Signup = () => {
	const navigate = useNavigate();
	const { signup } = useAuth();

	const [values, setValues] = useState({
		email: "usera@mail.ru",
		password: "12345",
		name: "boba",
		surname: "biba",
	});

	const handleChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};

	const handlesubmit = (e) => {
		e.preventDefault();
		signup(values, () => navigate("/profile", { replace: true }));
	};

	return (
		<>
			<form onSubmit={handlesubmit}>
				<input
					type="text"
					name="email"
					value={values.name}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="password"
					value={values.surname}
					onChange={handleChange}
				/>
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
				<Link to="/signin"> Sign in.</Link>
			</div>
		</>
	);
};

export { Signup };
