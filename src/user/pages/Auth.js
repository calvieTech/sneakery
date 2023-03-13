import React, { useState, useContext, useEffect } from "react";

import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./Auth.css";
import { redirect, useNavigate } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Auth = () => {
	const auth = useContext(AuthContext);
	const navigate = useNavigate();
	const [isLoginMode, setIsLoginMode] = useState(false);
	const { setIsLoading, isLoading, error, sendRequest, clearError } = useHttpClient();

	// console.log(`frontend isLoading: `, isLoading);
	const [formState, inputHandler, setFormData] = useForm(
		{
			email: {
				value: "",
				isValid: false,
			},
			password: {
				value: "",
				isValid: false,
			},
		},
		false
	);

	const switchModeHandler = async () => {
		if (!isLoginMode) {
			await setFormData(
				{
					...formState.inputs,
					name: undefined,
					avatar: undefined,
				},
				formState.inputs.email.isValid && formState.inputs.password.isValid
			);
		} else {
			await setFormData(
				{
					...formState.inputs,
					name: {
						value: "",
						isValid: false,
					},
					avatar: {
						value: null,
						isValid: false,
					},
				},
				false
			);
		}
		setIsLoginMode((prevMode) => !prevMode);
	};

	const authSubmitHandler = async (event) => {
		event.preventDefault();
		const inputs = formState.inputs;
		let res;

		let url = isLoginMode
			? "http://localhost:3001/api/users/login"
			: "http://localhost:3001/api/users/signup";

		if (isLoginMode) {
			try {
				res = await sendRequest(
					url,
					"POST",
					JSON.stringify({
						email: inputs.email.value,
						password: inputs.password.value,
					}),
					{ "Content-Type": "application/json" }
				);
				auth.login(res.user.id);
				navigate("/", { replace: true });
			} catch (err) {
				throw new Error(err.message);
			}
		} else {
			try {
				const formData = new FormData();
				console.log(`\n [DEBUG] inputs: `, inputs);
				const { name, email, password } = inputs;
				formData.append("name", name);
				formData.append("email", email);
				formData.append("password", password);
				// formData.append("image", inputs.image.value);
				res = await sendRequest(url, "POST", formData, {
					"Content-Type": "multipart/form-data; charset=utf-8",
				});
				auth.login(res.user.id);
				navigate("/", { replace: true });
			} catch (err) {
				setIsLoading(false);
				throw new Error(err.message);
			}
		}
	};

	return (
		<React.Fragment>
			<ErrorModal
				error={error}
				onClear={clearError}
			/>
			<Card className="authentication">
				{isLoading && <LoadingSpinner asOverlay />}
				{isLoginMode ? <h2>Login Required</h2> : <h2> Registration Required</h2>}
				<hr />
				<form onSubmit={authSubmitHandler}>
					{!isLoginMode && (
						<Input
							element="username"
							id="name"
							type="text"
							label="Your Username"
							validators={[VALIDATOR_MINLENGTH(4)]}
							errorText="Please enter a username, atleast 4 characters"
							onInput={inputHandler}
						/>
					)}
					{!isLoginMode && (
						<ImageUpload
							id="image"
							center
							onInput={inputHandler}
						/>
					)}
					<Input
						element="email"
						id="email"
						type="email"
						label="E-Mail"
						validators={[VALIDATOR_EMAIL()]}
						errorText="Please enter a valid email address."
						onInput={inputHandler}
					/>
					<Input
						element="password"
						id="password"
						type="password"
						label="Password"
						validators={[VALIDATOR_MINLENGTH(6)]}
						errorText="Please enter a valid password, at least 6 characters."
						onInput={inputHandler}
					/>
					<Button
						type="submit"
						disabled={!formState.isValid}>
						{isLoginMode ? "LOGIN" : "SIGNUP"}
					</Button>
				</form>
				<Button
					inverse
					onClick={switchModeHandler}>
					SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
				</Button>
			</Card>
		</React.Fragment>
	);
};

export default Auth;
