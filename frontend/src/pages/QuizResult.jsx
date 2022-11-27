import React from "react";
import { useNavigate } from "react-router-dom";
import s from "../styles/pages/quizresult.module.scss";

const QuizResult = () => {
	const navigate = useNavigate();

	return (
		<div className={s.quizresult}>
			<span className={s.congrats}>
				Правильных ответов: {!localStorage.getItem("correct") ? 0 : localStorage.getItem("correct")}
				<br />
				Всего карточек: {localStorage.getItem("cardAmount")}
			</span>

			<button
				onClick={() => {
					navigate("/profile");
				}}
				className={s.action}
			>
				Вернуться в профиль
			</button>
		</div>
	);
};

export default QuizResult;
