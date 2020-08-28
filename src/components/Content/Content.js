import React, { Component } from 'react';
import './Content.scss';
import ContentButton from '../ContentButton/ContentButton.js';
import Underline from '../Underline/Underline';

const Content = (props) => {
    let css_flex = 'center';
    let css_align = 'center';
    let button_align = 'space-around';

    switch(props.align) {
        case 'center':
            css_flex = 'center';
            css_align = 'center'; 
            button_align = 'space-around';
            break;
        case 'left':
            css_flex = 'flex-start';
            css_align = 'left'; 
            button_align = 'flex-start';
            break;
        case 'right':
            css_flex = 'flex-end';
            css_align = 'right'; 
            button_align = 'flex-end';
            break;
    }
    const content_container_style = {
        alignItems: css_flex, 

    }

    const header_style = {
        color: props.headercolor, 
        textAlign: css_align
    }

    const para_style = {
        color: props.paracolor,
        textAlign: css_align
    }

    // If the property twin is true, the second button will show
    let twinbutton = (props.twinbutton) ? <ContentButton buttonOnClick={props.twinbuttonOnClick} inverse={true} color={props.twinbuttoncolor} text={props.twinbuttontext}/> : '';   
    let button =  (props.buttontext != null) ? <ContentButton buttonOnHoverText={props.buttonOnHoverText} 
                                                              buttonOnHover={props.buttonOnHover}
                                                              buttonOnClick={props.buttonOnClick} 
                                                              inverse={props.buttoninverse} 
                                                              color={props.buttoncolor} 
                                                              text={props.buttontext}/> : '';

    return (
        <div className='content-container' style={content_container_style}>
            <div className='header-container'>
                <h3 style={header_style}>{props.headertext}</h3>
                <Underline color={props.headercolor} justifyContent={css_flex}/>
            </div>
            <p style={para_style}>{props.paratext}</p>
            <div style={{justifyContent: button_align}} className='buttons-container'>
                {button}
                {twinbutton}
            </div>
        </div>
    )
}

export default Content;