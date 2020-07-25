import React, { Component } from 'react';
import './ContactUsSection.scss';
import ContactUs from '../ContactUs/ContactUs';

function ContactUsSection(props) {
    return (
        <div className='contact-us-section-container'>
            <ContactUs title='Need to find out more?'
                       text='You can contact us anytime and we will respond within 24 hours'
                       email={props.data.email}
                       chatnow={() => console.log("Chatting now!")}
                       backgroundImage={props.data.image}
                       colors={props.colors}        
                       />
        </div>
    )
}

export default ContactUsSection;