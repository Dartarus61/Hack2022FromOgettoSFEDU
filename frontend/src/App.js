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
						<Route path="signin" element={<Signin />} />
						<Route path="signup" element={<Signup />} />
						<Route path="validate" element={<Validate />} />
						<Route path="edit" element={<EditProfile />} />
						<Route path="*" element={<Notfoundpage />} />
					</Route>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
