import React, { Component } from 'react';
import './App.scss';
import LandingPage from './LandingPage/LandingPage.js';
import Navbar from './Navbar/Navbar.js';
import AboutSection from './AboutSection/AboutSection.js';
import InfoSection from './InfoSection/InfoSection.js';
import TestimonialSection from './TestimonialSection/TestimonialSection.js';
import GetAQuoteSection from './GetAQuoteSection/GetAQuoteSection';
import ServicesSection from './ServicesSection/ServicesSection';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            darkmode: false
        }
    }

    darkMode = _ => {
        if(!this.state.darkmode) {
            return '';
        } else {
            return this.props.colors.black;
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
                <Navbar toggleDarkMode={this.toggleDarkMode} darkMode={this.darkMode} colors={this.props.colors} labels={['About', 'Testimonials', 'Quote', 'Services', 'Contact Us']}/>
                <LandingPage darkMode={this.darkMode} colors={this.props.colors} data={this.props.landingpage} />
                <AboutSection darkMode={this.darkMode} colors={this.props.colors} data={this.props.about}/>
                <InfoSection colors={this.props.colors} data={this.props.info}/>
                <TestimonialSection colors={this.props.colors} data={this.props.testimonial}/>
                <GetAQuoteSection darkMode={this.darkMode} colors={this.props.colors} data={this.props.getaquote}/>
                <ServicesSection darkMode={this.darkMode} colors={this.props.colors} data={this.props.services}/>
            </div>
        );
    }
}

export default App;