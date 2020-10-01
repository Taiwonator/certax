import React, {Component} from "react";
import Home from './Home';
import MockData from "../../mockdata.json";
import Login from "./Login";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PageNotFound from "./PageNotFound";
import AdminPanel from "./AdminPanel";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '', 
            password: '', 
            loggedin: false
        } 
        console.log(document.cookie);
    }

    updateInput = (key, value, callback) => {
        this.setState(() => ({
            [key]: value
        }), () => callback())
    }

    render () {
        return ( 
            <>
            <Router>
                <Switch>
                    <Route path='/login'
                        render={(props) => (
                                <Login {...props} colors={MockData.colors} email={this.state.email} password={this.state.password} loggedin={this.state.loggedin} updateInput={this.updateInput}/>
                            )}>
                    </Route>

                    <Route path='/' exact={true}
                        render={(props) => (
                            <Home {...props} 
                                    colors={MockData.colors}  
                                    landingpage={MockData.sections.landingpage} 
                                    about={MockData.sections.about}
                                    info={MockData.sections.info}
                                    testimonial={MockData.sections.testimonial}
                                    getaquote={MockData.sections.getaquote}
                                    services={MockData.sections.services}
                                    contactus={MockData.sections.contactus} 
                                    chatbox={MockData.chatbox}
                                    loggedIn={this.state.loggedin}/>
                        )}> 
                    </Route>
                    <Route path='/admin' 
                           render={(props) => (this.state.loggedin) ? <AdminPanel {...props} email={this.state.email} /> : <PageNotFound />}/>
                    <Route path='*' component={PageNotFound}/>
                </Switch>
            </Router>
            </> 
        );
    }
}
 
export default App;