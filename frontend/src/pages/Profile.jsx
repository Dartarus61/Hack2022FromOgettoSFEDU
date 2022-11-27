import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import s from "../styles/pages/profile.module.scss";
import { Link } from "react-router-dom";

const Profile = () => {
	const { signout, user, refresh} = useAuth();

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
			<span className={s.profile_title}> Профиль</span>
			<div className={s.profile_content}>
				<div className={s.profile_main_info}>
					<img src={user?.photo} alt="" className={s.profile_photo} />
					<span className={s.profile_initials}>
						{user?.surname +
							" " +
							user?.name +
							" " +
							user?.middlename}
					</span>
				</div>
				<div className={s.profile_info}>
					<span className={s.profile_info_point}>Должность:</span>
					<span className={s.profile_info_text}>
						{user?.position}
					</span>
					<span className={s.profile_info_point}>Город:</span>
					<span className={s.profile_info_text}>{user?.city[0] + user?.city.toLowerCase().slice(1)}</span>
					<span className={s.profile_info_point}>Формат работы:</span>
					<span className={s.profile_info_text}>
						{user?.typeOfWork[0] +
							user?.typeOfWork.toLowerCase().slice(1)}
					</span>
					<span className={s.profile_info_point}>Офис</span>
					<span className={s.profile_info_text}>
						{user?.office[0] + user?.office.toLowerCase().slice(1)}
					</span>
					<span className={s.profile_info_point}>Факт о работе:</span>
					<span className={s.profile_info_text}>{user?.fact}</span>
				</div>
			</div>
			<div className={s.profile_action_list}>
				<Link to="/choose" className={s.profile_button}>
					играть
				</Link>
				<Link
					to="/edit"
					className={`${s.profile_button} ${s.profile_button_bordered}`}
				>
					редактировать профиль{" "}
				</Link>
				<Link
					to="changepasss"
					className={`${s.profile_button} ${s.profile_button_grey}`}
				>
					сменить пароль
				</Link>
			</div>
		</div>
	);
};

export { Profile };
