import React, { Component } from 'react';
import './Home.scss';
import LandingPage from './LandingPage/LandingPage.js';
import Navbar from './Navbar/Navbar.js';
import AboutSection from './AboutSection/AboutSection.js';
import InfoSection from './InfoSection/InfoSection.js';
import TestimonialSection from './TestimonialSection/TestimonialSection.js';
import GetAQuoteSection from './GetAQuoteSection/GetAQuoteSection';
import ServicesSection from './ServicesSection/ServicesSection';
import ContactUsSection from './ContactUsSection/ContactUsSection';
import Footer from './Footer/Footer';
import Chatbox from './Chatbox/Chatbox';
import NewLandingPage from './NewLandingPage/NewLandingPage';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            darkmode: false
        }

        this.homeRef = React.createRef();
        this.aboutRef = React.createRef();
        this.infoRef = React.createRef();
        this.testimonialsRef = React.createRef();
        this.getaquoteRef = React.createRef();
        this.servicesRef = React.createRef();
        this.contactusRef = React.createRef();
    }

    componentDidMount = () => {
        
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

    

    // Scroll to any general element
    scrollToMyRef = (ref, yOffset) => {
        window.scrollTo(0, ref.current.offsetTop + yOffset);
    }

    scrollToHome = _ => this.scrollToMyRef(this.homeRef)
    scrollToAbout = _ => this.scrollToMyRef(this.aboutRef, -150)
    scrollToInfo = _ => this.scrollToMyRef(this.infoRef, -100)
    scrollToTestimonials = _ => this.scrollToMyRef(this.testimonialsRef, -300)
    scrollToGetAQuote = _ => this.scrollToMyRef(this.getaquoteRef, 250)
    scrollToQuoteQuestions = ref => this.scrollToMyRef(ref, this.getaquoteRef.current.offsetTop)
    scrollToServices = _ => this.scrollToMyRef(this.servicesRef, 100)
    scrollToContactUs = _ => this.scrollToMyRef(this.contactusRef, 0)

    render() {
        return (
            <div className='home-container' style={{backgroundColor: this.darkMode()}}>
                <Navbar toggleDarkMode={this.toggleDarkMode} 
                        darkMode={this.darkMode} 
                        colors={this.props.colors} 
                        loggedIn={this.props.loggedIn}
                        labels={['About', 'Testimonials', 'Quote', 'Services', 'Contact Us']}
                        label_scrolls={[this.scrollToAbout, this.scrollToTestimonials, this.scrollToGetAQuote, this.scrollToServices, this.scrollToContactUs]}
                        />
                { this.props.allowChat ? <Chatbox colors={this.props.colors} loggedIn={this.props.loggedIn} testing={true} allowChat={this.props.allowChat}/> : '' }
                <NewLandingPage />
                <LandingPage ref={this.homeRef} scroll={this.scrollToAbout} darkMode={this.darkMode} colors={this.props.colors} data={this.props.landingpage} />
                <AboutSection ref={this.aboutRef} scrollToInfo={this.scrollToInfo} scroll={this.scrollToTestimonials} darkMode={this.darkMode} colors={this.props.colors} data={this.props.about}/>
                <InfoSection ref={this.infoRef} colors={this.props.colors} scroll={this.scrollToGetAQuote} data={this.props.info}/>
                <TestimonialSection ref={this.testimonialsRef} colors={this.props.colors} data={this.props.testimonial}/>
                <GetAQuoteSection ref={this.getaquoteRef} scrollToQuote={this.scrollToGetAQuote} scrollToQuoteQuestions={this.scrollToQuoteQuestions} darkMode={this.darkMode} colors={this.props.colors} data={this.props.getaquote}/>
                <ServicesSection ref={this.servicesRef} scroll={this.scrollToContactUs} scrollToServices={this.scrollToServices} darkMode={this.darkMode} colors={this.props.colors} data={this.props.services}/>
                <ContactUsSection ref={this.contactusRef} colors={this.props.colors} data={this.props.contactus}/>
                <Footer colors={this.props.colors}
                        labels={['About', 'Testimonials', 'Quote', 'Services', 'Contact']}
                        label_scrolls={[this.scrollToAbout, this.scrollToTestimonials, this.scrollToGetAQuote, this.scrollToServices, this.scrollToContactUs]}
                        homescroll={this.scrollToHome}/>
            </div>
        );
    }
}

export default Home;