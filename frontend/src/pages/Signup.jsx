import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import s from "../styles/pages/auth.module.scss";

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
				<input
					className={s.auth_form_input}
					type="text"
					name="name"
					placeholder="Имя"
					value={values.email}
					onChange={handleChange}
				/>
				<input
					className={s.auth_form_input}
					type="text"
					name="surname"
					placeholder="Фамилия"
					value={values.password}
					onChange={handleChange}
				/>
				<div className={s.auth_form_actions}>
					<button
						className={s.action_button}
						onClick={() => {
							navigate("/signin");
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

export { Signup };
