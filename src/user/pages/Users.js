import React, { useEffect, useState } from "react";
import { fetchOptions } from "./Auth";
import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useNavigate } from "react-router-dom";

const Users = () => {
	// const [isLoading, setIsLoading] = useState(true);
	const [loadedUsers, setLoadedUsers] = useState([]);
	const { isLoading, setIsLoading, setError, error, sendRequest, clearError } = useHttpClient();
	const url = `http://${window.location.hostname}:3001/api/users`;

	useEffect(() => {
		let usersData;
		const fetchUsers = async (url) => {
			try {
				usersData = await sendRequest(url);

				if (!usersData.ok) {
					throw new Error(usersData.message);
				}
			} catch (err) {
				// console.log(`Error occurred in http-hook.js`);
			}
			setLoadedUsers(usersData.users);
		};
		fetchUsers(url);
	}, []);

	// useEffect(() => {
	// 	fetch(url)
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			console.log("\n[DEBUG] Retrieved User Data::", data);
	// 			setLoadedUsers(data.users);
	// 			setIsLoading(false);
	// 		});
	// }, []);

	return (
		<>
			<ErrorModal
				error={error}
				onClear={clearError}
			/>
			{isLoading && (
				<div className="center">
					<LoadingSpinner />
				</div>
			)}
			{!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
		</>
	);
};

export default Users;
