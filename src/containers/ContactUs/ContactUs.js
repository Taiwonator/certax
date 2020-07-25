import React, { Component } from 'react';
import './ContactUs.scss';
import Subheader from '../../components/Subheader/Subheader';
import Content from '../../components/Content/Content';

const ContactUs = (props) => {
    console.log(props.backgroundImage);
    return ( 
        <div className='contact-us-container'>
            <div className='contact-us-background-image' style={{backgroundImage: `url(${props.backgroundImage})`}}/>
            <Content headertext={props.title}
                     paratext={props.text}
                     headercolor={props.colors.white}
                     paracolor={props.colors.white}
                     buttontext={'Email'}
                     buttoncolor={props.colors.yellow}
                     buttonOnClick={() => console.log(props.email)}
                     twinbutton={true}
                     twinbuttontext={'Chat Now'}
                     twinbuttoncolor={props.colors.blue}
                     twinbuttonOnClick={props.chatnow}
                     align={'center'}/>
        </div>
    );
}
 
export default ContactUs;