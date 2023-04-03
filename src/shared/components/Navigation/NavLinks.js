import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../../context/auth-context";
import { Icon } from "@iconify/react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CottageIcon from "@mui/icons-material/Cottage";
import "./NavLinks.css";

const NavLinks = () => {
	const auth = useContext(AuthContext);

	return (
		<ul className="nav-links">
			<li>
				<NavLink to="/">
					<CottageIcon fontSize="medium" />
					&nbsp;HOME
				</NavLink>
			</li>
			{auth.isLoggedIn && (
				<li>
					<NavLink to={`${auth.userId}/sneakers`}>
						<Icon
							icon="mdi:shoe-sneaker"
							width="32"
							height="32"
							hFlip={true}
						/>
						&nbsp;MY KICKS
					</NavLink>
				</li>
			)}
			{auth.isLoggedIn && (
				<li>
					<NavLink to="/sneakers/new">
						<AddCircleIcon fontSize="medium" />
						&nbsp;ADD SNEAKER
					</NavLink>
				</li>
			)}
			{!auth.isLoggedIn && (
				<li>
					<NavLink to="/auth">
						<LoginIcon fontSize="medium" />
						&nbsp;SIGN-UP
					</NavLink>
				</li>
			)}
			{auth.isLoggedIn && (
				<li>
					<button onClick={auth.logout}>
						<LogoutIcon fontSize="medium" />
						&nbsp;LOGOUT
					</button>
				</li>
			)}
		</ul>
	);
};

export default NavLinks;
