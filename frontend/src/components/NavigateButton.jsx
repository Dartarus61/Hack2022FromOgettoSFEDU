import React from "react";
import { useNavigate } from "react-router-dom";
import s from "../styles/components/navigatebutton.module.scss";

const NavigateButton = ({ text }) => {
	const navigate = useNavigate();
	return (
		<button
			className={s.navigate__button}
			onClick={() => {
				navigate("/signin");
			}}
		>
			{text}
		</button>
	);
};

export default NavigateButton;
