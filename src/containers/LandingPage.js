import React, { Component } from 'react';
import './LandingPage.scss';
import CompanyLogo from '../components/CompanyLogo/CompanyLogo.js';
import CompanyName from '../components/CompanyName/CompanyName.js';

function LandingPage(props) {
    return ( 
        <div className='landing-page-container'>
            
            <div className='header-container'>
                <CompanyLogo colors={props.colors}/>
                <CompanyName colors={props.colors}/>
                {/* <ScrollDownButton colors={props.colors}/> */}
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