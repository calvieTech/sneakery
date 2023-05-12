import React from "react";
import Card from "../components/UIElements/Card";
import Button from "../components/FormElements/Button";

function NotFound() {
	return (
		<div className="not-found center">
			<Card>
				<h2>No sneakers found. 404. Maybe create one?</h2>
				<Button to="/sneakery_new">Share Your Favorite Pair of Kicks!</Button>
			</Card>
		</div>
	);
}

export default NotFound;
