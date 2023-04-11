import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = createRoot(document.getElementById("app"));

root.render(
	<>
		{/* <GoogleOAuthProvider clientId={`${process.env.GOOGLE_OAUTH_CLIENTID}`}> */}
		<App />
		{/* </GoogleOAuthProvider> */}
	</>
);
