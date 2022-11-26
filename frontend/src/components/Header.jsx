import React from "react";
import { Link } from "react-router-dom";
import s from "../styles/components/header.module.scss";
import logo from "../assets/logo.png";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Header = ({ isGray = false, children }) => {
	const { user, signout } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<header className={s.header}>
			<div className={s.header__container}>
				<Link to="/" className={s.header__logo}>
					<img
						className={s.header__logoImg}
						src={logo}
						alt="Логотип компании"
					/>
					<span className={s.company}>oggetto</span>
				</Link>

				{children}

				<div className={s.header__user_menu}>
					{location.pathname === "/" && !user ? (
						<button
							className={s.header__user_item}
							onClick={() => navigate("/signin")}
						>
							Войти
						</button>
					) : location.pathname === "/" && !!user ? (
						<>
							<button
								className={s.header__user}
								onClick={() =>
									signout(() =>
										navigate("/", { replace: true })
									)
								}
							></button>
							<button
								className={s.header__user_itemLogout}
								onClick={() =>
									signout(() =>
										navigate("/", { replace: true })
									)
								}
							></button>
						</>
					) : location.pathname === "/profile" && !!user ? (
						<button
							className={s.header__user_itemLogout}
							onClick={() =>
								signout(() => navigate("/", { replace: true }))
							}
						></button>
					) : (
						<></>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
