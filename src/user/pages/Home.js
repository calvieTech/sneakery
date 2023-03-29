import React from "react";
import "./Home.css";
import LeftNavBar from "../components/LeftNavBar";
import Layout, { Footer } from "antd/es/layout/layout";

function Home() {
	return (
		<div className="home__container">
			<LeftNavBar />
			<div className="home">Home</div>
			<div className="footer">&#169;2023 calvieTech</div>
		</div>
	);
}

export default Home;
