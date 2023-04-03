import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, redirect } from "react-router-dom";
import Users from "./user/pages/Users";
import NewSneaker from "./sneakers/pages/NewSneaker";
import UserSneakers from "./sneakers/pages/UserSneakers";
import UpdateSneaker from "./sneakers/pages/UpdateSneaker";
import Home from "./user/pages/Home";
import Auth from "./user/pages/Auth";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import NotFound from "./shared/pages/NotFound";
import { GoogleOAuthProvider } from "@react-oauth/google";
import UserProfile from "./user/components/UserProfile";

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userId, setUserId] = useState(false);

	const login = useCallback((uid) => {
		console.log(`uid: ${uid}`);
		setIsLoggedIn(true);
		setUserId(uid);
	}, []);

	const logout = useCallback(() => {
		console.log(`uid logout: ${uid}`);
		setIsLoggedIn(false);
		setUserId(null);
	}, []);

	let routes;
	if (isLoggedIn) {
		routes = (
			<>
				<Route
					path="/"
					exact
					element={<Home />}
				/>
				<Route
					path="/users"
					exact
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
				<Route
					element={<NotFound />}
					default
				/>
			</>
		);
	} else {
		routes = (
			<>
				<Route
					path="/"
					exact
					element={<Home />}
				/>
				<Route
					path="/users"
					exact
					element={<Users />}
				/>
				<Route
					path="/profile"
					exact
					element={<UserProfile />}
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
				<Route
					element={<NotFound />}
					default
				/>
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
