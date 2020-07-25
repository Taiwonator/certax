import React, { Component } from 'react';
import './ContactUs.scss';
import Subheader from '../../components/Subheader/Subheader';
import Content from '../../components/Content/Content';

const ContactUs = (props) => {
    return ( 
        <div className='contact-us-container'>
            <Content headertext={props.title}
                     paratext={props.text}
                     headercolor={props.colors.white}
                     paracolor={props.colors.white}
                     buttontext={'Chat Now'}
                     buttoncolor={'blue'}
                     buttonOnClick={props.chatnow}
                     align={'center'}/>
        </div>
    );
}
 
export default ContactUs;