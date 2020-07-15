import React, { Component } from 'react';
import './Underline.scss';

const Underline = (props) => {
    let display = 'flex';
    if(props.hide) {
        display = 'none';
    } else {
        display = 'flex';
    }

    return (
        <div className='underline' style={{justifyContent: props.justifyContent, display}}>
            <div style={{backgroundColor: props.color}}/>
        </div> 
    )
}

export default Underline;