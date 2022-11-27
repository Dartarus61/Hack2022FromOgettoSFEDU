import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import { Profile } from "./pages/Profile";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Notfoundpage } from "./pages/Notfoundpage";

import { Layout } from "./components/Layout";

import { RequireAuth } from "./hoc/RequireAuth";
import { AuthProvider } from "./hoc/AuthProvider";
import Homepage from "./pages/Homepage";
import EditProfile from "./pages/EditProfile";
import Validate from "./pages/Validate";
import Chooseamount from "./pages/Chooseamount";
import { Quiz } from "./pages/Quiz";
import QuizResult from "./pages/QuizResult";

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Homepage />} />
						<Route
							path="profile"
							element={
								<RequireAuth>
									<Profile />
								</RequireAuth>
							}
						/>
						<Route
							path="edit"
							element={
								<RequireAuth>
									<EditProfile />
								</RequireAuth>
							}
						/>
						<Route
							path="choose"
							element={
								<RequireAuth>
									<Chooseamount />
								</RequireAuth>
							}
						/>
						<Route
							path="play"
							element={
								<RequireAuth>
									<Quiz />
								</RequireAuth>
							}
						/>
						<Route path="signin" element={<Signin />} />
						<Route path="signup" element={<Signup />} />
						<Route path="validate" element={<Validate />} />
						<Route path="result" element={<QuizResult />} />
						<Route path="*" element={<Notfoundpage />} />
					</Route>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
