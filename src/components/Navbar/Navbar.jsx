import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import "./Navbar.css";

const Navbar = () => {
	return (
		<nav className="main-nav shadow-sm">
			<div className="container">
				<div className="main-nav__brand">
					<Link to="/" className="main-nav__brand__link">
						<img src={logo} alt="logo" />
						Employee System
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
