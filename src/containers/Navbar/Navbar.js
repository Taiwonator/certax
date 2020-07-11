import React, { Component } from 'react';
import './Navbar.scss';

import CompanyTextLogo from '../../components/CompanyTextLogo/CompanyTextLogo.js';
import ToggleButton from '../../components/ToggleButton/ToggleButton.js';

class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
    return (
        <nav className='navbar-container'>
            <div className='navbar-content'>
                <CompanyTextLogo colors={this.props.colors}/>
                <ToggleButton color={this.props.colors.blue}/>
            </div>
            <ul>

            </ul>
        </nav>
    )}
}

export default Navbar;