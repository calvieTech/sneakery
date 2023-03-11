import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import SneakerList from "../components/SneakerList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UserSneakers = () => {
	const [loadedSneakers, setLoadedSneakers] = useState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const userId = useParams().userId;
	const url = `http://${window.location.hostname}:3001/api/sneakers/user/${userId}`;

	useEffect(() => {
		const fetchSneakers = async (url) => {
			try {
				const responseData = await sendRequest(url);
				setLoadedSneakers(responseData.sneakers);
			} catch (err) {}
		};
		fetchSneakers(url);
	}, [sendRequest, userId, url]);

	const sneakerDeletedHandler = (deletedSneakerId) => {
		const updatedSneakers = loadedSneakers.filter(
			(prevSneaker) => prevSneaker !== deletedSneakerId
		);
		setLoadedSneakers(updatedSneakers);
	};

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
			{!isLoading && loadedSneakers && (
				<SneakerList
					items={loadedSneakers}
					onDeleteSneaker={sneakerDeletedHandler}
				/>
			)}
		</React.Fragment>
	);
};

export default UserSneakers;
