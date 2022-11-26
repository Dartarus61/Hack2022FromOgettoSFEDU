import React from "react";
import { useEffect } from "react";
import { useAuth } from "../context/useAuth";
import elipse from "../assets/images/homepageelipse.png";
import { Activity } from "../components/Activity";

import tick from "../assets/images/circleTick.svg";
import brain from "../assets/images/brain.svg";
import time from "../assets/images/time.svg";

import s from "../styles/pages/homepage.module.scss";
import NavigateButton from "../components/NavigateButton";

const Homepage = () => {
	const { signout, user, refresh } = useAuth();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) signout();
		if (token && !user) refresh(token);
	}, []);

	return (
		<div className={s.homepage}>
			<div className={s.preview}>
				<div className={s.preview__wrapper}>
					<div>
						<span className={s.preview__title}>ВИКТОРИНА</span>
						<p className={s.preview__subtitle}>
							интерактив для новых сотрудников в <br /> формате
							игры на запоминание коллег
						</p>
						<NavigateButton text="Играть" />
					</div>
					<img src={elipse} className={s.preview__photo} alt="" />
				</div>
			</div>
			<div className={s.activity__list}>
				<Activity
					title="Выбор режима"
					subtitle="5/10/15 карточек"
					img={tick}
				/>
				<Activity
					title="Отличная тренировка"
					subtitle="Развитие памяти"
					img={brain}
				/>
				<Activity
					title="Играй когда хочешь"
					subtitle="В любое время"
					img={time}
				/>
			</div>
		</div>
	);
};

export default Homepage;
