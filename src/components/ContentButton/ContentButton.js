import React, { Component } from 'react';
import './ContentButton.scss';

function ContentButton(props){

    let style = {}

    if(!props.inverse) {
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

    return (
        <div onClick={props.buttonOnClick} className={`button ${(!props.inverse) ? '' : 'inverse'} `} style={style} type='button'>{props.text}</div>
    )
}

export default ContentButton;