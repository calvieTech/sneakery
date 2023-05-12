import React, { useEffect, useState } from "react";
import { useParams, useNavigate, redirect } from "react-router-dom";
import SneakerList from "../components/SneakerList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import NotFound from "../../shared/pages/NotFound";

const UserSneakers = () => {
	const [loadedSneakers, setLoadedSneakers] = useState();
	const userId = useParams().userId;

	let url =
		process.env.NODE_ENV === "development"
			? `http://${window.location.hostname}:3001/user_sneakers/user/${userId}`
			: `https://${window.location.hostname}:3001/user_sneakers/user/${userId}`;

	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	useEffect(() => {
		const fetchSneakers = async (url) => {
			let responseData;
			try {
				responseData = await sendRequest(url);
				if (!responseData) {
					console.log("/sneakery_404");
					redirect("/sneakery_404");
				}
				setLoadedSneakers(responseData.sneakers);
			} catch (err) {
				console.error(err.message);
				throw new Error(err.message);
			}
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
			{!isLoading && !loadedSneakers && <NotFound />}
		</React.Fragment>
	);
};

export default UserSneakers;
