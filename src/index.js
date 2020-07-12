import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import MockData from "../mockdata.json"

ReactDOM.render(<App mockdata={MockData}/>, document.getElementById("root"));