import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

  // define the callAPI function that takes a first name and last name as parameters
var callAPI = (revenue)=>{
  // instantiate a headers object
  var myHeaders = new Headers();
  // add content type header to object
  myHeaders.append("Content-Type", "application/json");
  // using built in JSON utility package turn object to string and store in a variable
  var raw = JSON.stringify({"revenue":revenue});
  // create a JSON object with parameters for API call and store in a variable
  var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  };
  // make API call with parameters and use promises to get response
  fetch("https://rzv4naag4h.execute-api.eu-west-2.amazonaws.com/Deploy", requestOptions)
  .then(response => response.text())
  .then(result => alert(JSON.parse(result).body))
  .catch(error => console.log('error', error));
}

var revenueInput = document.getElementById("revenueInput")
revenueInput.addEventListener("change", function(){
  callAPI(revenueInput.value)
})
