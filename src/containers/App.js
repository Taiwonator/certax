import React, { Component } from 'react';
import './App.scss';
import LandingPage from './LandingPage/LandingPage.js';

class App extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <LandingPage colors={this.props.mockdata.colors} data={this.props.mockdata.sections.landingpage} />
            </div>
        );
    }
}

export default App;