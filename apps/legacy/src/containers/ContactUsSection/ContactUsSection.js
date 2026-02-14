import React, { Component } from 'react';
import './ContactUsSection.scss';
import ContactUs from '../ContactUs/ContactUs';

const ContactUsSection = React.forwardRef((props, ref) => {
    return (
        <section ref={ref} className='contact-us-section-container' aria-label="Contact Us">
            <ContactUs title='Free initial consultation?'
                text="You can contact us anytime and we won't keep you waiting"
                email={props.data.email}
                chatnow={() => console.log("Chatting now!")}
                backgroundImage={props.data.image}
                colors={props.colors}
            />
        </section>
    )
})

export default ContactUsSection;