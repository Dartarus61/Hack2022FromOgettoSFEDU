import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import s from "../styles/pages/profile.module.scss";

const Profile = () => {
	const { signout, user, refresh } = useAuth();

	useEffect(() => {
		const token = localStorage.getItem("token");
		console.log(user);
		if (!token) {
			signout();
		} else if (!user && !!token) {
			refresh(token);
		}
	}, []);

	return (
		<div className={s.profile}>
	{/* 		<span className={s.profile_title}> Профиль</span>
			<div className={s.profile_content}>
				<div className={s.profile_main_info}>
					<img src={user.file} alt="" />
					<span className={s.profile_initials}></span>
				</div>
				<div className={s.profile_info}>
					<span className={s.profile_info_point}>Должность:</span>
					<span className={s.profile_info_text}>{user.position}</span>
					<span className={s.profile_info_point}>Город:</span>
					<span className={s.profile_info_text}>{user.city}</span>
					<span className={s.profile_info_point}>Формат работы:</span>
					<span className={s.profile_info_text}>
						{user.typeOfWork}
					</span>
					<span className={s.profile_info_point}>Офис</span>
					<span className={s.profile_info_text}>{user.office}</span>
					<span className={s.profile_info_point}>Факт о работе:</span>
					<span className={s.profile_info_text}>{user.fact}</span>
				</div>
			</div> */}
		</div>
	);
};

export { Profile };
