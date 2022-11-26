import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
	return (
		<>
			<Link to="signup">Sign up</Link>
			<br/>
			<Link to="signin">Sign in</Link>
			<div>Well come</div>
		</>
	);
};

export default Homepage;
