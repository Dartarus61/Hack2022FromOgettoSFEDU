import { Routes, Route, Navigate } from "react-router-dom";

import { Profile } from "./pages/Profile";
import { Auth } from "./pages/Auth";
import { Notfoundpage } from "./pages/Notfoundpage";

import { Layout } from "./components/Layout";

import { RequireAuth } from "./hoc/RequireAuth";
import { AuthProvider } from "./hoc/AuthProvider";
import Homepage from "./pages/Homepage";

function App() {
	return (
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
					<Route path="auth" element={<Auth />} />
					<Route path="*" element={<Notfoundpage />} />
				</Route>
			</Routes>
		</AuthProvider>
	);
}

export default App;
