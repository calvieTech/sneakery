import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./user/pages/Users";
import NewSneaker from "./sneakers/pages/NewSneaker";
import UserSneakers from "./sneakers/pages/UserSneakers";
import UpdateSneaker from "./sneakers/pages/UpdateSneaker";
import Auth from "./user/pages/Auth";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import Home from "./user/pages/Home";
import { useAuth } from "./shared/hooks/auth-hook";
import SneakerList from "./sneakers/components/SneakerList";
import NotFound from "./shared/pages/NotFound";

const App = () => {
	const { token, login, logout, userId } = useAuth();

	let routes;

	if (token) {
		routes = (
			<>
				<Route
					default
					path="/sneakery_home"
					element={<Home />}
				/>
				<Route
					path="/sneakery_users"
					element={<Users />}
				/>
				<Route
					path="/sneakery_user/:userId/sneakers"
					exact
					element={<UserSneakers />}
				/>
				<Route
					path="/sneakery_new"
					exact
					element={<NewSneaker />}
				/>
				<Route
					path="/sneakery_update/:sneakerId"
					exact
					element={<UpdateSneaker />}
				/>
				<Route
					path="/sneakery_404"
					exact
					element={<NotFound />}
				/>
			</>
		);
	} else {
		routes = (
			<>
				<Route
					path="/sneakery_home"
					element={<Home />}
					default
				/>
				<Route
					path="/sneakery_users"
					exact
					element={<Users />}
				/>
				<Route
					path="/sneakery_user/:userId/sneakers"
					exact
					element={<UserSneakers />}
				/>
				<Route
					path="/sneakery_auth"
					element={<Auth />}
				/>
				<Route
					path="/sneakery_404"
					exact
					element={<NotFound />}
				/>
			</>
		);
	}

	return (
		// token will be truthy or falsy
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				jwt: token,
				userId: userId,
				login: login,
				logout: logout,
			}}>
			<Router>
				<MainNavigation />
				<main>
					<Routes>{routes}</Routes>
				</main>
			</Router>
		</AuthContext.Provider>
	);
};

export default App;
