import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../../context/auth-context";
import { Icon } from "@iconify/react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./NavLinks.css";

const NavLinks = () => {
	const auth = useContext(AuthContext);

	return (
		<ul className="nav-links">
			<li>
				<NavLink
					to="/"
					style={{ display: "flex", alignItems: "center" }}>
					<GroupIcon fontSize="medium" />
					&nbsp;ALL USERS
				</NavLink>
			</li>
			{auth.isLoggedIn && (
				<li>
					<NavLink
						to={`${auth.userId}/places`}
						style={{ display: "flex", alignItems: "center" }}>
						<Icon
							icon="mdi:shoe-sneaker"
							width="26"
							height="26"
							hFlip={true}
						/>
						&nbsp;MY SNEAKERS
					</NavLink>
				</li>
			)}
			{auth.isLoggedIn && (
				<li>
					<NavLink
						to="/places/new"
						style={{ display: "flex", alignItems: "center" }}>
						<AddCircleIcon fontSize="medium" />
						&nbsp;ADD PLACE
					</NavLink>
				</li>
			)}
			{!auth.isLoggedIn && (
				<li>
					<NavLink
						to="/auth"
						style={{ display: "flex", alignItems: "center" }}>
						<LoginIcon fontSize="medium" />
						&nbsp;SIGN-UP
					</NavLink>
				</li>
			)}
			{auth.isLoggedIn && (
				<li>
					<button onClick={auth.logout}>
						<LogoutIcon />
						&nbsp;LOGOUT
					</button>
				</li>
			)}
		</ul>
	);
};

export default NavLinks;
