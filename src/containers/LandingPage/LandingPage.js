import React, { Component } from 'react';
import './LandingPage.scss';
import HeaderContent from '../HeaderContent/HeaderContent.js';
import Staircase from '../../components/Staircase/Staircase.js';
import BackgroundPanels from '../../components/BackgroundPanels/BackgroundPanels.js';

import useWindowDimensions from '../../helperFunctions/useWindowDimensions.js';

let upper_staircase_type = 'full';
let lower_staircase_type = 'partial';

function LandingPage(props) {
    const { height, width } = useWindowDimensions();
    if(width <= 600 & upper_staircase_type != 'mini') {
        upper_staircase_type = 'mini';
        lower_staircase_type = 'single';
    } else if(width > 600 & upper_staircase_type != 'full') {
        upper_staircase_type = 'full';
        lower_staircase_type = 'partial';
    }
    
    return ( 
        <div className='landing-page-container'>
            <HeaderContent colors={props.colors} />
            <div className='landing-page-graphics-container'>
                <BackgroundPanels />
                <Staircase position='BR' color={props.colors.blue} type={upper_staircase_type}/>
                <Staircase position= 'BL' color={props.colors.yellow} type={upper_staircase_type}/>  
                <div className='lower-staircase-container'>
                    <Staircase position='TR' color={props.colors.yellow} type={lower_staircase_type}/>
                    <Staircase position='TL' color={props.colors.blue} type={lower_staircase_type}/>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;

//container
//--design
//----left-s
//----right-s
//----background
//--header
//----logo
//----name
//----action-button