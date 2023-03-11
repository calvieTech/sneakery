import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";
// import logo from "./static/sneakery_logo2.png";

const root = createRoot(document.getElementById("app"));

root.render(<App />);
