import React from "react";
import "./Logo.css";

function Logo() {
	return (
		<div className="logo-container">
			<img
				src={require("../../../static/sneakery_logo2.png")}
				className="logo"
			/>
		</div>
	);
}

export default Logo;
