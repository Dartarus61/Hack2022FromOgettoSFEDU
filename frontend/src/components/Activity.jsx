import React from "react";
import s from "../styles/components/homepage.module.scss";

const Activity = ({ img, title, subtitle }) => {
	return (
		<div className={s.activity}>
			<img src={img} alt="" className={s.activity__icon} />
			<div className={s.activity__text}>
				<span className={s.activity__title}>{title}</span>
				<span className={s.activity__subtitle}>{subtitle}</span>
			</div>
		</div>
	);
};

export { Activity };
