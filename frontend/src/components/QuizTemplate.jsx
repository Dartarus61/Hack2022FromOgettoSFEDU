import { useState, useEffect } from "react";
import s from "../styles/components/quiztemplate.module.scss";
import React from "react";
import QuizCard from "./QuizCard";

const QuizTemplate = ({ questions, handleCounter, handleAnswers }) => {
	return (
		<div className={s.quiztemplate}>
			{questions.map((card, i) => {
				return (
					<QuizCard
						card={card}
						key={card.options[i]}
						i={i}
						handleCounter={handleCounter}
						handleAnswers={handleAnswers}
					/>
				);
			})}
		</div>
	);
};

export { QuizTemplate };
