import React from "react";
import Home from './Pages/Home';
import MockData from "../../mockdata.json";
import Login from "./Pages/Login";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PageNotFound from "./Pages/PageNotFound";

const App = (props) => {
    return ( 
        <>
        <Router>
            <Switch>
                <Route path='/login'>
                    <Login />
                </Route>
                <Route path='/' exact={true}>
                    <Home colors={MockData.colors}  
                                landingpage={MockData.sections.landingpage} 
                                about={MockData.sections.about}
                                info={MockData.sections.info}
                                testimonial={MockData.sections.testimonial}
                                getaquote={MockData.sections.getaquote}
                                services={MockData.sections.services}
                                contactus={MockData.sections.contactus} />
                </Route>
                <Route path='*' component={PageNotFound}/>
            </Switch>
        </Router>
        </> 
    );
}
 
export default App;