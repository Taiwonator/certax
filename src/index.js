import React from "react";
import ReactDOM from "react-dom";
import {hitEndpoint} from "./apitest/QuoteFunctions";
import App from "./containers/App";

ReactDOM.render(<App />, document.getElementById("root"));

// fetch('https://api.certaxnorwich.accountant/getUID', {
//     method: 'GET', // or 'PUT'
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     mode: 'no-cors',
//     credentials: 'include',
// })
// .then(response => {
//     response.text();
// })
// .then(data => {
//     console.log('Success:', data);
// })
// .catch((error) => {
//     console.error('Error:', error);
// });

hitEndpoint();

