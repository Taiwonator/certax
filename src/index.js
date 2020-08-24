import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import MockData from "../mockdata.json"
import {hitEndpoint} from "./apitest/QuoteFunctions";
import * as QuoteMock from './mocking/mock';

ReactDOM.render(<App colors={MockData.colors}  
                     landingpage={MockData.sections.landingpage} 
                     about={MockData.sections.about}
                     info={MockData.sections.info}
                     testimonial={MockData.sections.testimonial}
                     getaquote={MockData.sections.getaquote}
                     services={MockData.sections.services}
                     contactus={MockData.sections.contactus}
                     />, document.getElementById("root"));

fetch('https://api.certaxnorwich.accountant/getUID', {
    method: 'GET', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    mode: 'no-cors',
    credentials: 'include',
})
.then(response => {
    response.text();
})
.then(data => {
    console.log('Success:', data);
})
.catch((error) => {
    console.error('Error:', error);
});

hitEndpoint();

console.log(QuoteMock.getBatchThree({service: 'property investor'}));