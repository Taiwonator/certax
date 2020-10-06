import React, { Component } from 'react';
import Staircase from '../../components/Staircase/Staircase.js';
import './AboutSection.scss';
import useWindowDimensions from '../../helperFunctions/useWindowDimensions.js';
import ContentBox from '../../components/ContentBox/ContentBox.js';
import ScrollDownButton from '../../components/ScrollDownButton/ScrollDownButton.js';

let staircase_type = 'partial';

const AboutSection = React.forwardRef((props, ref) => {
    const { height, width } = useWindowDimensions();
    const phone_size = 600;

    // Changes the staircase type for phone view
    if(width <= phone_size & staircase_type != 'single') {
        staircase_type = 'single';
    } else if(width > phone_size & staircase_type != 'partial') {
        staircase_type = 'partial';
    }

    return (
        <div ref={ref} style={{borderBottomColor: (props.darkMode()) ? props.colors.yellow : props.colors.lightgrey}} className='about-section-container'>
            <div className='about-section-content-wrapper'>
                <div className='about-section-content-container'>
                    { width > phone_size ? 
                    <>
                    <Staircase position='TR' color={props.colors.yellow} type='block'/>
                    <Staircase position='TL' color={props.colors.blue} type='block'/> 
                    <Staircase position='BR' color={props.colors.blue} type='block'/>
                    <Staircase position='BL' color={props.colors.yellow} type='block'/> 
                    </>
                    : ''}
                    <ContentBox darkMode={props.darkMode} colors={props.colors} content={props.data} buttonOnClick={props.scrollToInfo}/>
                </div>
                <ScrollDownButton scroll={props.scroll} color={props.colors.blue}/>
            </div>
        </div>
    )
})

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