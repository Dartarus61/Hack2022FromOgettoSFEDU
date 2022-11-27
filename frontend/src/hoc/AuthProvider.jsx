import { createContext, useState } from "react";
import api from "../service/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	const loadSingleProfile = async (token) => {
		await api
			.get("/user/profile", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(({ data }) => {
				console.log(data);
				setUser(data);
			})
			.catch((e) => {
				console.error(e);
			});
	};

	const refresh = async (token) => {
		await api
			.get("/auth/refresh", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => {
				loadSingleProfile(token);
			})
			.catch((e) => {
				console.error(e);
			});
	};

	const signin = async (authData, cb) => {
		await api
			.post("/auth/login", authData)
			.then(({ data }) => {
				console.log(authData);
				if (!!data.user.isActivated) {
					localStorage.setItem("token", data.token);
					localStorage.setItem("id", data.user.id);
					loadSingleProfile(localStorage.getItem("token"));
					console.log();
					if (!data.user.firstIn) {
						navigate("/edit");
						return;
					}
					cb();
				} else {
					localStorage.clear();
					setUser(null);
					navigate("/validate");
				}
			})
			.catch((e) => {
				console.error(e);
				console.log(authData);
			});
	};
	const signup = async (newUser, cb) => {
		await api
			.post("/auth/registration", newUser)
			.then(({ data }) => {
				localStorage.setItem("token", data.token);
				localStorage.setItem("id", data.user.id);
				setUser(newUser.email);
				cb();
			})
			.catch((e) => {
				console.error(e);
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
