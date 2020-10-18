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

                     buttontext={`01603 821014`}
                     buttoninverse={true}
                     buttoncolor={props.colors.yellow}
                     buttonOnClick={props.chatnow}
                    //  buttonOnHoverText={props.email}
                    //  buttonOnHover={true}

                     twinbutton={true}
                     twinbuttoninverse={true}
                     twinbuttontext={props.email}
                     twinbuttoncolor={props.colors.blue}
                     twinbuttonOnClick={() => console.log(props.email)}
                     
                     align={'center'}
                     
                     text={[{
                        type: "para", 
                        text: props.text, 
                        highlightedWord: 'anytime'
                    }]}/>
        </div>
    );
}
 
export default ContactUs;