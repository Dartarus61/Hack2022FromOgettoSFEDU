import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
	const navigate = useNavigate();
	const { signout, user, refresh } = useAuth();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			signout();
		} else if (!user && !!token) {
			refresh(token);
		}
	}, []);

	return (
		<div>
			<h1>Create a post</h1>
			<h3>{user ? user.name + " " + user.surname : ""}</h3>
			<button
				onClick={() => signout(() => navigate("/", { replace: true }))}
			>
				Log Out
			</button>
		</div>
	);
};

export { Profile };
