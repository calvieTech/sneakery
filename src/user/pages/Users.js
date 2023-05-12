import React, { useEffect, useState } from "react";

import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [loadedUsers, setLoadedUsers] = useState();

	let url =
		process.env.NODE_ENV === "development"
			? `http://${window.location.hostname}:3001/users`
			: `https://${window.location.hostname}:3001/users`;

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				let responseData = await sendRequest(url);
				setLoadedUsers(responseData.users);
			} catch (err) {
				throw new Error(err.message);
			}
		};
		fetchUsers();
	}, [sendRequest]);

	return (
		<React.Fragment>
			<ErrorModal
				error={error}
				onClear={clearError}
			/>
			{isLoading && (
				<div className="center">
					<LoadingSpinner />
				</div>
			)}
			{!isLoading && loadedUsers && <UsersList usersList={loadedUsers} />}
		</React.Fragment>
	);
};

export default Users;
