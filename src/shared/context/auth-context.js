import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
	isLoggedIn: false,
	userId: null,
	jwt: null,
	login: () => {},
	logout: () => {},
});
