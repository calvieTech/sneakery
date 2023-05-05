import React, { useState, useContext } from "react";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./SneakerItem.css";
const { useNavigate } = require("react-router-dom");

const PlaceSneaker = (props) => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const auth = useContext(AuthContext);
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	let url =
		process.env.NODE_ENV !== "development"
			? `http://${window.location.hostname}:3001/sneakers/${props.id}`
			: `${process.env.SNEAKERY_BACKEND_BASE_URL}/sneakers/${props.id}`;

	const navigate = useNavigate();

	const showDeleteWarningHandler = () => {
		setShowConfirmModal(true);
	};

	const cancelDeleteHandler = () => {
		setShowConfirmModal(false);
	};

	const confirmDeleteHandler = async () => {
		setShowConfirmModal(false);
		try {
			const res = await sendRequest(url, "DELETE", null, {
				Authorization: "Bearer " + auth.jwt,
			});
			props.onDelete(props.id);
		} catch (err) {
			console.error(err.message);
			throw new Error(err);
		}
		navigate("/", { replace: true });
	};

	return (
		<React.Fragment>
			<ErrorModal
				error={error}
				onClear={clearError}
			/>
			{/* <Modal
				show={showMap}
				onCancel={closeMapHandler}
				header={props.address}
				contentClass="sneakers-item__modal-content"
				footerClass="sneakers-item__modal-actions">
				footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
				<div className="map-container">
					<Map
						center={props.coordinates}
						zoom={16}
					/>
				</div>
			</Modal> */}
			<Modal
				show={showConfirmModal}
				onCancel={cancelDeleteHandler}
				header="Are you sure?"
				footerClass="sneakers-item__modal-actions"
				footer={
					<React.Fragment>
						<Button
							inverse
							onClick={cancelDeleteHandler}>
							CANCEL
						</Button>
						<Button
							danger
							onClick={confirmDeleteHandler}>
							DELETE
						</Button>
					</React.Fragment>
				}>
				<p>
					Do you want to proceed and delete this sneakers? Please note that it can't be undone
					thereafter.
				</p>
			</Modal>
			<li className="sneakers-item">
				{isLoading && <LoadingSpinner asOverlay />}
				<Card className="sneakers-item__content">
					<div className="sneakers-item__image">
						<img
							src={`${props.image}`}
							alt={props.title}
						/>
					</div>
					<div className="sneakers-item__info">
						<h2>{props.title}</h2>
						{/* <h3>{props.address}</h3> */}
						<p>{props.description}</p>
					</div>
					<div className="sneakers-item__actions">
						{/* <Button
							inverse
							onClick={openMapHandler}>
							VIEW ON MAP
						</Button> */}
						{<Button to={`/sneakers/${props.id}`}>COMMENT</Button>}
						{auth.userId === props.creatorId && <Button to={`/sneakers/${props.id}`}>EDIT</Button>}

						{auth.userId === props.creatorId && (
							<Button
								danger
								onClick={showDeleteWarningHandler}>
								DELETE
							</Button>
						)}
					</div>
				</Card>
			</li>
		</React.Fragment>
	);
};

export default PlaceSneaker;
