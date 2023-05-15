import React, { useEffect, useState } from "react";

import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import NewSneaker from "../../sneakers/pages/NewSneaker";
import { populate_users } from "../../scripts/populate_users";

const Users = () => {
	const { isLoading, error, clearError, sendRequest } = useHttpClient();
	const [loadedUsers, setLoadedUsers] = useState();

	let url =
		process.env.NODE_ENV === "development"
			? `http://${window.location.hostname}:3001/users`
			: `https://${window.location.hostname}:3001/users`;

	let newUrl = url + "/signup";


	useEffect(() => {
		const fetchUsers = async () => {
			let responseData;
			try {
				responseData = await sendRequest(url);
				return responseData;
			} catch (err) {
				throw new Error(err.message);
			}
		};

		fetchUsers().then((response) => {
			setLoadedUsers(response.users);
		});
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
