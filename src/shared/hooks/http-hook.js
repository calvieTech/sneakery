import React, { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	// console.log(`\n [DEBUG] http-hook, setIsLoading: `, isLoading);

	let activeHttpRequests = useRef([]);

	let sendRequest = useCallback(async (url, method = "GET", body = null, headers) => {
		const httpAbortCtrl = new AbortController();
		activeHttpRequests.current.push(httpAbortCtrl);
		setIsLoading(true);
		let resData;

		try {
			const res = await fetch(url, {
				method,
				body,
				headers,
				signal: httpAbortCtrl.signal,
			});

			resData = await res.json();
			activeHttpRequests.current = activeHttpRequests.current.filter(
				(reqCtrl) => reqCtrl !== httpAbortCtrl
			);

			if (!res.ok) {
				throw new Error(resData.message);
			}
			setIsLoading(false);
			return resData;
		} catch (err) {
			setError(err.message);
			setIsLoading(false);
			throw err;
		}
	}, []);

	// const sendRequest = useCallback(
	// 	async (url, method = "GET", body = null, headers = {}, mode = "cors") => {
	// 		let resData;
	// 		const httpAbortCtrl = new AbortController();
	// 		activeHttpRequests.current.push(httpAbortCtrl);
	// 		setIsLoading(true);
	// 		try {
	// 			const res = await fetch(url, {
	// 				method,
	// 				body,
	// 				headers,
	// 				signal: httpAbortCtrl.signal,
	// 			});

	// 			resData = await res.json();
	// 			console.log("\n[DEBUG] resData:", resData);

	// 			activeHttpRequests.current = activeHttpRequests.current.filter(
	// 				(reqCtrl) => reqCtrl !== httpAbortCtrl
	// 			);

	// 			console.log("\n[DEBUG]2 resData:", resData);

	// 			if (!res.ok) {
	// 				setError(err.message);
	// 				throw new Error(resData.message);
	// 			}
	// 		} catch (err) {
	// 			setError(err.message);
	// 			setIsLoading(false);
	// 			throw err;
	// 		}
	// 		setIsLoading(false);
	// 		return resData;
	// 	},
	// 	[]
	// );

	const clearError = () => {
		setError(null);
	};

	useEffect(() => {
		return () => {
			activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
		};
	}, []);

	return { isLoading, setIsLoading, error, setError, sendRequest, clearError };
};
