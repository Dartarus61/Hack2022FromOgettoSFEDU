import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";
import s from "../styles/pages/auth.module.scss";
import CustomButton from "../components/CustomButton";

const Signin = () => {
	const [values, setValues] = useState({
		email: "usera@oggettoweb.com",
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
		<div className={s.auth}>
			<span className={s.auth_title}>Авторизация</span>
			<form className={s.auth_form} onSubmit={handlesubmit}>
				<input
					className={s.auth_form_input}
					type="text"
					name="email"
					placeholder="E-mail"
					value={values.email}
					onChange={handleChange}
				/>
				<input
					className={s.auth_form_input}
					type="text"
					name="password"
					placeholder="Пароль"
					value={values.password}
					onChange={handleChange}
				/>
				<div className={s.auth_form_actions}>
					<button
						className={s.action_button}
						onClick={() => {
							navigate("/signup");
						}}
					>
						Создать аккаунт
					</button>
					<button type="submit" className={s.action_button}>
						Войти
					</button>
				</div>
			</form>
		</div>
	);
};

export { Signin };
