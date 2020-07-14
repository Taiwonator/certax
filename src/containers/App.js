import React, { Component } from 'react';
import './App.scss';
import LandingPage from './LandingPage/LandingPage.js';
import Navbar from './Navbar/Navbar.js';
import AboutSection from './AboutSection/AboutSection.js';
import InfoSection from './InfoSection/InfoSection.js';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            darkmode: true
        }
    }

    darkMode = _ => {
        if(!this.state.darkmode) {
            return '';
        } else {
            return this.props.mockdata.colors.black;
        }
    }

    toggleDarkMode = _ => {
        this.setState({
            darkmode: !this.state.darkmode
        });
    }

    render() {
        return (
            <div className='app-container' style={{backgroundColor: this.darkMode()}}>
                <Navbar toggleDarkMode={this.toggleDarkMode} darkMode={this.darkMode} colors={this.props.mockdata.colors} labels={['About', 'Testimonials', 'Quote', 'Services', 'Contact Us']}/>
                <LandingPage darkMode={this.darkMode} colors={this.props.mockdata.colors} data={this.props.mockdata.sections.landingpage} />
                <AboutSection darkMode={this.darkMode} colors={this.props.mockdata.colors} data={this.props.mockdata.sections.about}/>
                <InfoSection colors={this.props.mockdata.colors} data={this.props.mockdata.sections.info}/>
            </div>
        );
    }
}

export default App;