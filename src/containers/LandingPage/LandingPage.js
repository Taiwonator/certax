import React, { Component } from 'react';
import './LandingPage.scss';
import HeaderContent from '../HeaderContent/HeaderContent.js';
import Staircase from '../../components/Staircase/Staircase.js';
import BackgroundPanels from '../../components/BackgroundPanels/BackgroundPanels.js';

import useWindowDimensions from '../../helperFunctions/useWindowDimensions.js';

let staircase_type = 'full';

function LandingPage(props) {
    const { height, width } = useWindowDimensions();
    if(width <= 600 & staircase_type != 'mini') {
        staircase_type = 'mini';
    } else if(width > 600 & staircase_type != 'full') {
        staircase_type = 'full';
    }
    
    return ( 
        <div className='landing-page-container'>
            <HeaderContent colors={props.colors} />
            <div className='landing-page-graphics-container'>
                <BackgroundPanels />
                <Staircase position='BR' color={props.colors.blue} type={staircase_type}/>
                <Staircase position= 'BL' color={props.colors.yellow} type={staircase_type}/>  
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