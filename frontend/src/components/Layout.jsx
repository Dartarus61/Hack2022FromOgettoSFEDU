import { Outlet } from "react-router-dom";

const Layout = () => {
	return (
		<>
			<header>
				LOGO
			</header>

			<main className="container">
				<Outlet />
			</main>

			<footer className="container">
				&copy; D-bilding & Co.
			</footer>
		</>
	);
};

export { Layout };
