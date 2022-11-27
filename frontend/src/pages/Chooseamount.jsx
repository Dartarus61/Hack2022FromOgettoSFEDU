import React from "react";
import s from "../styles/pages/chooseamount.module.scss";
import light from "../assets/images/light.jpg";
import medium from "../assets/images/medium.jpg";
import hard from "../assets/images/hard.jpg";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import api from "../service/api";

const Chooseamount = () => {
	const [activeRadio, setActiveRadio] = useState(10);
	const navigate = useNavigate();
	const handleChange = (e) => {
		localStorage.setItem("cardAmount", e.target.id);
		setActiveRadio(e.target.id);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = {
			count: +localStorage.getItem("cardAmount"),
			id: +localStorage.getItem("id"),
		}
		console.log(data);
		// await api.post("/questionary/getqa",data)
		// 	.then((res) => {
		// 		console.log(res.data);
		// 	})
		// 	.catch((e) => {
		// 		console.log(e);
		// 	})
		// 	.finally((res) => {
		// 		console.log(res);
		// 	});
		navigate("/play");
	};
	return (
		<form className={s.chooseamount} onSubmit={handleSubmit}>
			<div className={s.chooseamount_title}>
				Выберите количество карточек
			</div>
			<div className={s.chooseamount_variants}>
				<label htmlFor="5" className={s.chooseamount_level}>
					<img
						src={light}
						alt=""
						className={s.chooseamount_level_img}
					/>
					<span className={s.chooseamount_level_title}>
						5 карточек
					</span>
					<label htmlFor="5" className={s.chooseamount_level_label}>
						<input
							type="radio"
							name="choose"
							onChange={handleChange}
							id="5"
							className={s.chooseamount_level_input}
						/>
						Выбрать
					</label>
				</label>
				<label htmlFor="10" className={s.chooseamount_level}>
					<img
						src={medium}
						alt=""
						className={s.chooseamount_level_img}
					/>
					<span className={s.chooseamount_level_title}>
						10 карточек
					</span>
					<label htmlFor="10" className={s.chooseamount_level_label}>
						<input
							onChange={handleChange}
							defaultChecked
							type="radio"
							name="choose"
							id="10"
							className={s.chooseamount_level_input}
						/>
						Выбрать
					</label>
				</label>
				<label htmlFor="15" className={s.chooseamount_level}>
					<img
						src={hard}
						alt=""
						className={s.chooseamount_level_img}
					/>
					<span className={s.chooseamount_level_title}>
						15 карточек
					</span>
					<label className={s.chooseamount_level_label}>
						<input
							type="radio"
							onChange={handleChange}
							name="choose"
							id="15"
							className={s.chooseamount_level_input}
						/>
						Выбрать
					</label>
				</label>
			</div>
			<button type="submit" className={s.chooseamount_action}>
				Выбрать режим
			</button>
		</form>
	);
};

export default Chooseamount;
