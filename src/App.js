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
	const [token, setToken] = useState(false);
	const [userId, setUserId] = useState(null);

	const login = useCallback((uid, token) => {
		// console.log(`uid login: ${uid}`);
		setToken(token);
		setUserId(uid);
	}, []);

	const logout = useCallback(() => {
		// console.log(`uid logout: ${uid}`);
		setToken(null);
		setUserId(null);
	}, []);

	let routes;

	if (token) {
		routes = (
			<>
				<Route
					path="/"
					exact
					element={<Users />}
				/>
				{/* <Route
					path="/users"
					exact
					element={<Users />}
				/> */}
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
