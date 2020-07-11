import React, { Component } from 'react';
import './LandingPage.scss';
import HeaderContent from '../HeaderContent/HeaderContent.js';
import Staircase from '../../components/Staircase/Staircase.js';

function LandingPage(props) {
    return ( 
        <div className='landing-page-container'>
            <HeaderContent colors={props.colors} />
            <div className='landing-page-graphics-container'>
                <div>
                    <Staircase position='BR' color={props.colors.blue}/>
                    <Staircase position= 'BL' color={props.colors.yellow}/>
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