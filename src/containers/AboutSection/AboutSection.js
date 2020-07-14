import React, { Component } from 'react';
import Staircase from '../../components/Staircase/Staircase.js';
import './AboutSection.scss';
import useWindowDimensions from '../../helperFunctions/useWindowDimensions.js';
import ContentBox from '../../components/ContentBox/ContentBox.js';
import ScrollDownButton from '../../components/ScrollDownButton/ScrollDownButton.js';

let staircase_type = 'partial';

function AboutSection(props) {
    const { height, width } = useWindowDimensions();
    const phone_size = 600;

    // Changes the staircase type for phone view
    if(width <= phone_size & staircase_type != 'single') {
        staircase_type = 'single';
    } else if(width > phone_size & staircase_type != 'partial') {
        staircase_type = 'partial';
    }

    return (
        <div className='about-section-container'>
            <div className='about-section-content-wrapper'>
                <div className='about-section-content-container'>
                    <Staircase position='TR' color={props.colors.yellow} type='block'/>
                    <Staircase position='TL' color={props.colors.blue} type='block'/> 
                    <Staircase position='BR' color={props.colors.blue} type='block'/>
                    <Staircase position='BL' color={props.colors.yellow} type='block'/> 
                    <ContentBox colors={props.colors} content={props.data}/>
                </div>
                <ScrollDownButton color={props.colors.blue}/>
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