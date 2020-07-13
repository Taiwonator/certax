import React, { Component } from 'react';
import './Content.scss';
import ContentButton from '../ContentButton/ContentButton.js';

const Content = (props) => (
    <div className='content-container'>
        <div className='header-container'>
            <h3 style={{color: props.headercolor}}>{props.headertext}</h3>
            <div className='underline'>
                <div style={{backgroundColor: props.headercolor}} />
            </div>
        </div>
        <p style={{color: props.paracolor}} >{props.paratext}</p>
        <ContentButton inverse='true' color={props.headercolor} text='More info'/>
    </div>
)

export default Content;