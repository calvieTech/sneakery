import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import "./UserSneakers.css";

const UserSneakers = (props) => {
	return (
		<li className="user-sneaker">
			<Card className="user-sneaker__content">
				<Link to={`/${props.id}/sneakers`}>
					<div className="user-sneaker__image">
						<Avatar
							image={props.image}
							alt={props.name}
						/>
					</div>
					<div className="user-sneaker__info">
						<h2>{props.name}</h2>
						<h3>
							{props.sneakerCount} {props.sneakerCount === 1 ? "Sneaker" : "Sneakers"}
						</h3>
					</div>
				</Link>
			</Card>
		</li>
	);
};

export default UserSneakers;
