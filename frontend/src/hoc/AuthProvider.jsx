import { createContext, useState } from "react";
import api from "../service/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	const profile = async (token) => {
		await api
			.get("/user/profile", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(({ data }) => {
				setUser(data);
			});
	};

	const refresh = async (token) => {
		await api
			.get("/auth/refresh", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(({ data }) => {
				profile(token);
			});
	};

	const signin = async (userData, cb) => {
		await api.post("/auth/login", userData).then(({ data }) => {
			if (!!data.user.isActivated) {
				setUser(userData);
				localStorage.setItem("token", data.token);
				cb();
			} else {
				localStorage.clear();
				setUser(null);
				navigate("/validate");
			}
		});
	};
	const signup = async (newUser, cb) => {
		await api.post("/auth/registration", newUser).then(({ data }) => {
			localStorage.setItem("token", data.token);
			setUser(newUser.email);
			navigate("/validate");
		});
	};
	const signout = () => {
		localStorage.clear();
		setUser(null);
		navigate("/");
	};

	const value = { user, setUser, signin, signup, signout, refresh };

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};
