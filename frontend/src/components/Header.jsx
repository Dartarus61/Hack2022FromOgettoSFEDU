import React from "react";
import s from "../styles/components/header.module.scss";
import { HeaderMenu } from "./HeaderMenu";

import { Logo } from "./Logo";

const Header = ({ children }) => {
	return (
		<header className={s.header}>
			<div className={s.header__container}>
				<Logo />
				{children}
				<HeaderMenu s={s} />
			</div>
		</header>
	);
};

export default Header;
