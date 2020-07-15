import React, { Component } from 'react';
import './Subheader.scss';
import Underline from '../Underline/Underline';

const Subheader = (props) => {

    return(
        <div className='subheader-container'>
            <h3 style={{color: props.color}}>{props.text}</h3>
            <Underline color={props.color} justifyContent='center' hide={!props.underline}/>
            
        </div>
    )
}


export default Subheader;