import React, { Component } from 'react';
import './App.scss';
import LandingPage from './LandingPage/LandingPage.js';
import Navbar from './Navbar/Navbar.js';
import AboutSection from './AboutSection/AboutSection.js';

class App extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <Navbar colors={this.props.mockdata.colors} labels={['About', 'Testimonials', 'Quote', 'Services', 'Contact Us']}/>
                <LandingPage colors={this.props.mockdata.colors} data={this.props.mockdata.sections.landingpage} />
                <AboutSection colors={this.props.mockdata.colors} data={this.props.mockdata.sections.about}/>
            </div>
        );
    }
}

export default App;