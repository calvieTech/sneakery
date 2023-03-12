import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, redirect } from "react-router-dom";

import Users from "./user/pages/Users";
import NewSneaker from "./sneakers/pages/NewSneaker";
import UserSneakers from "./sneakers/pages/UserSneakers";
import UpdateSneaker from "./sneakers/pages/UpdateSneaker";
import Auth from "./user/pages/Auth";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import NotFound from "./shared/pages/NotFound";

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userId, setUserId] = useState(false);

	const login = useCallback((uid) => {
		setIsLoggedIn(true);
		setUserId(uid);
	}, []);

	const logout = useCallback(() => {
		setIsLoggedIn(false);
		setUserId(null);
	}, []);

	let routes;
	if (isLoggedIn) {
		routes = (
			<>
				<Route
					path="/"
					element={<Users />}
				/>
				<Route
					path="/:userId/sneakers"
					exact
					element={<UserSneakers />}
				/>
				<Route
					path="/sneakers/new"
					exact
					element={<NewSneaker />}
				/>
				<Route
					path="/sneakers/:sneakerId"
					exact
					element={<UpdateSneaker />}
				/>
				<Route element={<NotFound />} />
			</>
		);
	} else {
		routes = (
			<>
				<Route
					path="/"
					exact
					element={<Users />}
				/>
				<Route
					path="/:userId/sneakers"
					exact
					element={<UserSneakers />}
				/>
				<Route
					path="/auth"
					element={<Auth />}
				/>
				<Route element={<NotFound />} />
			</>
		);
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
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
