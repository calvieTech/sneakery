import React, { useContext } from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./SneakerForm.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHistory, useNavigate } from "react-router-dom";

const NewSneaker = () => {
	const auth = useContext(AuthContext);
	const { sendRequest, error, isLoading, clearError } = useHttpClient();
	const navigate = useNavigate();
	const url = `http://${window.location.hostname}:3001/api/sneaker`;

	const [formState, inputHandler] = useForm(
		{
			title: {
				value: "",
				isValid: false,
			},
			description: {
				value: "",
				isValid: false,
			},
			// address: {
			// 	value: "",
			// 	isValid: false,
			// },
		},
		false
	);

	const sneakerSubmitHandler = async (event) => {
		event.preventDefault();
		try {
			const res = await sendRequest(
				url,
				"POST",
				JSON.stringify({
					title: formState.inputs.title.value,
					description: formState.inputs.description.value,
					creator: auth.userId,
				}),
				{ "Content-Type": "application/json; charset=utf-8" }
			);
			// Redirect the user to a different page
			navigate("/", { replace: true });
		} catch (err) {
			console.error(err.message);
			throw new Error(err);
		}
	};

	return (
		<React.Fragment>
			<ErrorModal
				error={error}
				onClear={clearError}
			/>
			<form
				className="place-form"
				onSubmit={sneakerSubmitHandler}>
				{isLoading && <LoadingSpinner asOverlay />}
				<Input
					id="title"
					element="input"
					type="text"
					label="Title"
					validators={[VALIDATOR_REQUIRE()]}
					errorText="Please enter a valid title."
					onInput={inputHandler}
				/>
				<Input
					id="description"
					element="textarea"
					label="Description"
					validators={[VALIDATOR_MINLENGTH(5)]}
					errorText="Please enter a valid description (at least 5 characters)."
					onInput={inputHandler}
				/>
				{/* <Input
					id="address"
					element="input"
					label="Address"
					validators={[VALIDATOR_REQUIRE()]}
					errorText="Please enter a valid address."
					onInput={inputHandler}
				/> */}
				<Button
					type="submit"
					disabled={!formState.isValid}>
					ADD PLACE
				</Button>
			</form>
		</React.Fragment>
	);
};

export default NewSneaker;
