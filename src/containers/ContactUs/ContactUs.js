import React, { Component } from 'react';
import './ContactUs.scss';
import Content from '../../components/Content/Content';

const ContactUs = (props) => {
    
    return ( 
        <div className='contact-us-container'>
            <div className='contact-us-background-image' style={{backgroundImage: `url(${props.backgroundImage})`}}/>
            <Content headertext={props.title}
                     paratext={props.text}
                     headercolor={props.colors.white}
                     paracolor={props.colors.white}

                     buttontext={`Chat Now`}
                     buttoninverse={true}
                     buttoncolor={props.colors.yellow}
                     buttonOnClick={props.chatnow}
                    //  buttonOnHoverText={props.email}
                    //  buttonOnHover={true}

                     twinbutton={true}
                     twinbuttontext={`Email: ${props.email}`}
                     twinbuttoncolor={props.colors.blue}
                     twinbuttonOnClick={() => console.log(props.email)}
                     
                     align={'center'}/>
        </div>
    );
}
 
export default ContactUs;