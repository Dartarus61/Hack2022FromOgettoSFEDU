import React, { useState } from "react";
import s from "../styles/components/quiztemplate.module.scss";
import greyPhoto from "../assets/images/greyPhoto.jpg";
import { useNavigate } from "react-router-dom";

const QuizCard = ({ card, key, handleCounter, handleAnswers }) => {
	const handleChange = (e) => {
		setAnswer(e.target.value);
		setRadioChecked(true);
	};
	const navigate = useNavigate();
	const [checked, setChecked] = useState(null);
	const [radioChecked, setRadioChecked] = useState(false);
	const [answer, setAnswer] = useState(null);
	const handleCardOption = (e) => {
		if (answer === card.answer) handleAnswers();
		setChecked(true);
		handleCounter();
	};

	return !checked ? (
		<label
			key={key}
			className={s.quiztemplate_level}
			style={{ display: checked ? "none" : "" }}
		>
			<img
				src={greyPhoto}
				className={s.quiztemplate_level_img}
				onError={(e) => {
					console.log(e);
				}}
			/>
			<span className={s.quiztemplate_level_title}>{card.fact}</span>
			<div className={s.answer_list}>
				{card.options
					.slice(1, -1)
					.split(",")
					.map((option, i) => {
						return (
							<label
								className={s.quiztemplate_level_label}
								key={option + "#" + i + 1}
							>
								<input
									type="radio"
									onChange={handleChange}
									name="quiz_options"
									id={option}
									value={option}
									className={s.quiztemplate_level_input}
								/>
								{option}
							</label>
						);
					})}
			</div>
			<button
				type="button"
				onClick={
					localStorage.getItem("counter") ===
					localStorage.getItem("cardAmount")
						? (localStorage.removeItem("counter"),
						  navigate("/result"))
						: handleCardOption
				}
				className={s.quiztemplate_action}
			>
				{radioChecked ? "Выбрать" : "Пропустить"}
			</button>
		</label>
	) : (
		""
	);
};

export default QuizCard;
