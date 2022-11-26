import React from "react";
import { useNavigate } from "react-router-dom";
import s from "../styles/components/navigatebutton.module.scss";

const CustomButton = ({ text, path, style = "", handler = null }) => {
	const navigate = useNavigate();
	return (
		<button
			className={(s.navigate__button)}
			onClick={
				!handler
					? () => {
							navigate(path);
					  }
					: handler
			}
		>
			{text}
		</button>
	);
};

export default CustomButton;
