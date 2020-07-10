import React, { Component } from 'react';
import './App.scss';
import LandingPage from './LandingPage.js';

class App extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <LandingPage colors={this.props.mockdata.colors} data={this.props.mockdata.sections.landingpage} />
        );
    }
}

export default App;