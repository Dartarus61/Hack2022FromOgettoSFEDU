import React from "react";
import greyPhoto from "../assets/images/greyPhoto.jpg";
import exitIcon from "../assets/images/exiticon.svg";
import { useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const HeaderMenu = ({ s }) => {
	const { user, signout } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	//TODO: Make photo paste method
	const userPhoto = null;
	return (
		<div>
			{location.pathname === "/" && !localStorage.getItem("token") ? (
				<button
					className={s.header_action}
					onClick={() => navigate("/signup")}
				>
					Регистрация
				</button>
			) : localStorage.getItem("token") &&
			  !location.pathname === "/profile" && location.pathname === "/" ? (
				<div className={s.header_menu}>
					<Link to="/profile" className={s.user_menu}>
						<img src={!userPhoto ? greyPhoto : userPhoto} alt="" />
					</Link>
					<button
						className={s.header_action}
						onClick={() => signout()}
					>
						<img src={exitIcon} alt="" />
					</button>
				</div>
			) : location.pathname === "/profile" ? (
				<button className={s.header_action} onClick={() => signout()}>
					Выйти
				</button>
			) : location.pathname === "/signup" ||
			  location.pathname === "/signin" ? (
				<button
					className={s.header_action}
					onClick={() => navigate(-1)}
				>
					Назад
				</button>
			) : (
				<></>
			)}
		</div>
	);
};

export { HeaderMenu };
