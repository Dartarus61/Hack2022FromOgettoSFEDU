import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Auth = () => {
	const [values, setValues] = useState({
		email: "user@mail.ru",
		password: "12345",
	});

	const handleChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};
	const navigate = useNavigate();
	const location = useLocation();
	const { signin } = useAuth();

	const handlesubmit = (e) => {
		e.preventDefault();
		const form = e.target;
		const user = form.email.value;
    console.log(user);
		signin(user, () => navigate("/profile", { replace: true }));
	};

	return (
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
	);
};

export { Auth };
