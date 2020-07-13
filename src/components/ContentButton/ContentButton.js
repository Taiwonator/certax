import React, { Component } from 'react';
import './ContentButton.scss';

function ContentButton(props){

    let style = {}

    if(props.inverse != 'true') {
        style = {
            color: props.color,
            borderColor:props.color
        }
    } else {
        style = {
            color: 'white', 
            borderColor: 'none', 
            backgroundColor: props.color
        }
    }



    console.log(style.color);

    return (
        <div className={`button ${(props.inverse != 'true') ? '' : 'inverse'} `} style={style} type='button'>{props.text}</div>
    )
}

export default ContentButton;