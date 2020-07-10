import React, { Component } from 'react';
import './App.scss';
import LandingPage from './LandingPage.js';

class App extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <LandingPage data={this.props.mockdata} />
        );
    }
}

export default App;