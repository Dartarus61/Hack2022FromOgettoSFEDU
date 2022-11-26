import React from "react";
import logo from "../assets/logo.png";
import s from "../styles/components/logo.module.scss";
import { Link } from "react-router-dom";

const Logo = () => {
	return (
		<Link to="/" className={s.logo}>
			<img className={s.logo_img} src={logo} alt="Логотип компании" />
			<span className={s.logo_text}>oggetto</span>
		</Link>
	);
};

export { Logo };
