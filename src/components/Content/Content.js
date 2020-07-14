import React, { Component } from 'react';
import './Content.scss';
import ContentButton from '../ContentButton/ContentButton.js';

const Content = (props) => {
    let css_flex = 'center';
    let css_align = 'center';
    switch(props.align) {
        case 'center':
            css_flex = 'center';
            css_align = 'center'; 
            break;
        case 'left':
            css_flex = 'flex-start';
            css_align = 'left'; 
            break;
        case 'right':
            css_flex = 'flex-end';
            css_align = 'right'; 
            break;
    }
    const content_container_style = {
        alignItems: css_flex, 

    }

    const underline_style = {
        justifyContent: css_flex
    }

    const header_style = {
        color: props.headercolor, 
        textAlign: css_align
    }

    const para_style = {
        color: props.paracolor,
        textAlign: css_align
    }
    

    return (
        <div className='content-container' style={content_container_style}>
            <div className='header-container'>
                <h3 style={header_style}>{props.headertext}</h3>
                <div className='underline' style={underline_style}>
                    <div style={{backgroundColor: props.headercolor}} />
                </div>
            </div>
            <p style={para_style}>{props.paratext}</p>
            <ContentButton inverse='true' color={props.headercolor} text='More info'/>
        </div>
    )
}

export default Content;