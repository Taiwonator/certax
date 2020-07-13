import React, { Component } from 'react';
import Staircase from '../../components/Staircase/Staircase.js';

function AboutSection(props) {
    return (
        <div className='about-section-container'>
            <Staircase position='TR' color={props.colors.yellow} type='partial'/>
            <Staircase position='TL' color={props.colors.blue} type='partial'/>
        </div>
    )
}

export default AboutSection;

// Graphics
// Box
// --Graphics
// --Textbox
// ----Graphics
// ----Text Content
// ------Header
// ------Text
// ------Button