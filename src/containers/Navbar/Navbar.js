import React, { Component } from 'react';
import './Navbar.scss';

import CompanyTextLogo from '../../components/CompanyTextLogo/CompanyTextLogo.js';
import ToggleButton from '../../components/ToggleButton/ToggleButton.js';

function Navbar(props) {
    return (
        <nav className='navbar-container'>
            <div className='navbar-content'>
                <CompanyTextLogo colors={props.colors}/>
                <ToggleButton color={props.colors.blue}/>
            </div>
            <ul>

            </ul>
        </nav>
    )
}

export default Navbar;