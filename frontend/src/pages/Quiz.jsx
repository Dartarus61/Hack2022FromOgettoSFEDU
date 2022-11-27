import React from "react";
import s from "../styles/pages/chooseamount.module.scss";
import light from "../assets/images/light.jpg";
import medium from "../assets/images/medium.jpg";
import hard from "../assets/images/hard.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { QuizTemplate } from "../components/QuizTemplate";

const Quiz = () => {
	const [counter, setCounter] = useState(1);
	const [correct, setCorrect] = useState(0);
	const handleCounter = () => {
		localStorage.setItem("counter",counter + 1)
		setCounter(counter + 1);
	};
	const handleAnswers = () => {
		localStorage.setItem("correct",correct + 1)
		setCorrect(correct + 1);
		
	};
	const list = [
		{
			photo: "http://localhost:5000/sendfile/img/31ee8cd7-21c5-4784-aa51-5edbb6feec9e.jpg",
			options: "[head,lead,worker]",
			fact: "проверяю людей на знание технологий",
			answer: "worker",
			employee: "Иван Иванов Иванович",
		},
		{
			photo: "http://localhost:5000/sendfile/img/31ee8cd7-21c5-4784-aa51-5edbb6feec9e.jpg",
			options: "[head,lead,worker]",
			fact: "проверяю людей на знание технологий",
			answer: "worker",
			employee: "Иван Иванов Иванович",
		},
		{
			photo: "http://localhost:5000/sendfile/img/31ee8cd7-21c5-4784-aa51-5edbb6feec9e.jpg",
			options: "[head,lead,worker]",
			fact: "проверяю людей на знание технологий",
			answer: "worker",
			employee: "Иван Иванов Иванович",
		},
		{
			photo: "http://localhost:5000/sendfile/img/31ee8cd7-21c5-4784-aa51-5edbb6feec9e.jpg",
			options: "[head,lead,worker]",
			fact: "проверяю людей на знание технологий",
			answer: "worker",
			employee: "Иван Иванов Иванович",
		},
		{
			photo: "http://localhost:5000/sendfile/img/31ee8cd7-21c5-4784-aa51-5edbb6feec9e.jpg",
			options: "[head,lead,worker]",
			fact: "проверяю людей на знание технологий",
			answer: "worker",
			employee: "Иван Иванов Иванович",
		},
		
	];
	
	return (
		<form className={s.chooseamount}>
			<div className={s.chooseamount_title}>Вопрос {counter} из 5</div>
			<div className={s.chooseamount_variants}>
				<QuizTemplate
					questions={list}
					handleCounter={handleCounter}
					handleAnswers={handleAnswers}
				/>
			</div>
		</form>
	);
};

export { Quiz };
