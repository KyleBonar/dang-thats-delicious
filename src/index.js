import React from "react";
import ReactDOM from "react-dom";

//component that handles all SPA routing
import Router from "./components/Router/Router.js";

//general styles
import "./scss/style.scss";
ReactDOM.render(<Router />, document.getElementById("app"));
