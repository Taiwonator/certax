import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import MockData from "../mockdata.json"

console.log(MockData);

ReactDOM.render(<App colors={MockData.colors}  
                     landingpage={MockData.sections.landingpage} 
                     about={MockData.sections.about}
                     info={MockData.sections.info}
                     testimonial={MockData.sections.testimonial}
                     getaquote={MockData.sections.getaquote}
                     services={MockData.sections.services}
                     contactus={MockData.sections.contactus}
                     />, document.getElementById("root"));