import React, { Component } from 'react';
import Staircase from '../../components/Staircase/Staircase.js';
import './AboutSection.scss';
import useWindowDimensions from '../../helperFunctions/useWindowDimensions.js';

let staircase_type = 'partial';

function AboutSection(props) {
    const { height, width } = useWindowDimensions();
    if(width <= 600 & staircase_type != 'single') {
        staircase_type = 'single';
    } else if(width > 600 & staircase_type != 'partial') {
        staircase_type = 'partial';
    }

    return (
        <div className='about-section-container'>
            <Staircase position='TR' color={props.colors.yellow} type={staircase_type}/>
            <Staircase position='TL' color={props.colors.blue} type={staircase_type}/>
            <div className='about-section-content-container'>
                
            </div>
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