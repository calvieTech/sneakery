import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./user/pages/Users";
import NewSneaker from "./sneakers/pages/NewSneaker";
import UserSneakers from "./sneakers/pages/UserSneakers";
import UpdateSneaker from "./sneakers/pages/UpdateSneaker";
// import Home from "./user/pages/Home";
import Auth from "./user/pages/Auth";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import NotFound from "./shared/pages/NotFound";
import UserProfile from "./user/components/UserProfile";

const App = () => {
	const [token, setToken] = useState(false);
	const [userId, setUserId] = useState(null);
	const [tokenExpireDate, setTokenExpireDate] = useState();

	let logoutTimer;

	const login = useCallback((uid, token, tokenExpirationDate) => {
		setToken(token);
		setUserId(uid);

		// tokenExpiresIn 1 hour
		const tokenExpiresIn = tokenExpirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

		setTokenExpireDate(tokenExpirationDate);

		localStorage.setItem(
			"userData",
			JSON.stringify({ userId: uid, token: token, tokenExpiresIn: tokenExpiresIn.toISOString() })
		);
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setUserId(null);
		setTokenExpireDate(null);
		localStorage.removeItem("userData");
	}, []);

	useEffect(() => {
		const storedUserData = JSON.parse(localStorage.getItem("userData"));

		if (
			storedUserData &&
			storedUserData.token &&
			new Date(storedUserData.tokenExpiresIn > new Date())
		) {
			login(storedUserData.userId, storedUserData.token, new Date(storedUserData.tokenExpiresIn));
		}
	}, [login]);

	useEffect(() => {
		if (token && tokenExpireDate) {
			const remainingTokenTime = tokenExpireDate.getTime() - new Date().getTime();
			logoutTimer = setTimeout(logout, remainingTokenTime);
		} else {
			clearTimeout(logoutTimer);
		}
	}, [token, logout, tokenExpireDate]);

	let routes;

	if (token) {
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
