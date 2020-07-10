import React, { Component } from 'react';
import './App.scss';

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