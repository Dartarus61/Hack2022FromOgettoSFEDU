import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UploadAndDisplayImage } from "../components/UploadAndDisplayimage";
import { useAuth } from "../context/useAuth";
import instance from "../service/api";
import s from "../styles/pages/auth.module.scss";

import greyPhoto from "../assets/images/greyPhoto.jpg";

const EditProfile = () => {
	const navigate = useNavigate();

	const [values, setValues] = useState({
		name: "dwada",
		surname: "wadawd",
		middlename: "awdawd",
		typeOfWork: "УДАЛЕННО",
		office: "РОСТОВ-НА-ДОНУ",
		city: "Москва",
		position: "designer",
		fact: "Учу дружбе сервера",
	});

	const handleChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};

	const [selectedFile, setSelectedFile] = useState();
	const [preview, setPreview] = useState("");

	useEffect(() => {
		if (!selectedFile) {
			setPreview(undefined);
			return;
		}
		const objectUrl = URL.createObjectURL(selectedFile);
		setPreview(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [selectedFile]);

	const onSelectFile = (e) => {
		if (!e.target.files || e.target.files.length === 0) {
			setSelectedFile(undefined);
			return;
		}

		setSelectedFile(e.target.files[0]);
	};

	const handlesubmit = async (e) => {
		e.preventDefault();
		const dataArray = new FormData();
		dataArray.append("file", selectedFile);
		dataArray.append("name", values.name);
		dataArray.append("surname", values.surname);
		dataArray.append("middlename", values.middlename);
		dataArray.append("typeOfWork", values.typeOfWork);
		dataArray.append("office", values.office);
		dataArray.append("city", values.city);
		dataArray.append("position", values.position);
		dataArray.append("fact", values.fact);
		dataArray.append("userId", localStorage.getItem("id"));
		await instance
			.post("questionary/createquest", dataArray, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className={s.auth}>
			<span className={s.auth_title}>Анкета</span>
			<form className={s.auth_form} onSubmit={handlesubmit}>
				<input
					className={s.auth_form_input}
					type="text"
					name="name"
					placeholder="Имя"
					value={values.name}
					onChange={handleChange}
				/>
				<input
					className={s.auth_form_input}
					type="text"
					name="surname"
					placeholder="Фамилия"
					value={values.surname}
					onChange={handleChange}
				/>
				<input
					className={s.auth_form_input}
					type="text"
					name="middlename"
					placeholder="Отчество"
					value={values.middlename}
					onChange={handleChange}
				/>
				<div className={s.form_radio_group}>
					<span className={s.form_radio_group_title}>
						Формат работы:
					</span>
					<div className={s.form_radio_group_list}>
						<label
							htmlFor="office"
							className={s.form_radio_group_label}
						>
							<input
								type="radio"
								name="typeOfWork"
								id="office"
								value={values.typeOfWork}
								onChange={handleChange}
							/>
							Офис
						</label>
						<label
							htmlFor="remote"
							className={s.form_radio_group_label}
						>
							<input
								type="radio"
								name="typeOfWork"
								id="remote"
								checked
								value={values.typeOfWork}
								onChange={handleChange}
							/>
							Удаленка
						</label>
						<label
							htmlFor="gybrid"
							className={s.form_radio_group_label}
						>
							<input
								type="radio"
								name="typeOfWork"
								id="gybrid"
								value={values.typeOfWork}
								onChange={handleChange}
							/>
							Гибрид
						</label>
					</div>
				</div>
				<input
					className={s.auth_form_input}
					type="text"
					name="city"
					placeholder="Город проживания:"
					value={values.city}
					onChange={handleChange}
				/>
				<input
					className={s.auth_form_input}
					type="text"
					name="office"
					placeholder="Офис"
					value={values.office}
					onChange={handleChange}
				/>
				<input
					className={s.auth_form_input}
					name="position"
					placeholder="Должность"
					value={values.position}
					onChange={handleChange}
				/>

				<textarea
					className={`${s.auth_form_input} ${s.auth_form_input_fact}`}
					type="text"
					name="fact"
					placeholder="Факты о вашей работе: "
					value={values.fact}
					onChange={handleChange}
				></textarea>

				<img
					width="200px"
					height="200px"
					src={!preview ? greyPhoto : preview}
					className={s.form_upload_photo}
				/>
				<input
					type="file"
					id="userPhoto"
					onChange={onSelectFile}
					hidden
				/>
				<label
					htmlFor="userPhoto"
					className={s.form_upload_photo_label}
				>
					Выбрать фото
				</label>
				<div className={s.auth_form_actions}>
					<button
						className={s.action_button}
						onClick={() => {
							navigate("/signin");
						}}
					>
						Создать аккаунт
					</button>
					<button type="submit" className={s.action_button}>
						Войти
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditProfile;
