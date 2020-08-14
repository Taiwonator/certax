import React, { Component } from 'react';
import './Navbar.scss';

import CompanyTextLogo from '../../components/CompanyTextLogo/CompanyTextLogo.js';
import ToggleButton from '../../components/ToggleButton/ToggleButton.js';
import NavbarItem from '../../components/NavbarItem/NavbarItem.js';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {active: false};
    }

    toggleNavbar = () => {
        this.setState({
            active: !this.state.active
        });
    }

    activeStateDarkMode = () => {
        return this.props.darkMode();
    }

    scrollTo = (i) => {
        // Toggles scrollbar
        this.toggleNavbar();
        this.props.label_scrolls[i]();
    }
    

    render() {
    return (
        <nav style={{ backgroundColor: this.activeStateDarkMode()}} className={`navbar-container ${this.state.active ? 'navbar-active' : ''}`}>
            <div className='navbar-content'>
                <CompanyTextLogo toggleDarkMode={this.props.toggleDarkMode} colors={this.props.colors}/>
                <ToggleButton color={this.props.colors.blue} toggleNavbar={this.toggleNavbar} shape='bars' inverse='true'/>
            </div>
            <ul className='navbar-items'>
                <ToggleButton color={this.props.colors.yellow} toggleNavbar={this.toggleNavbar} shape='cross' inverse='true'/>
                <NavbarItemList scrollTo={this.scrollTo} label_scrolls={this.props.label_scrolls} labels={this.props.labels} color={this.props.colors.yellow} />
                {/* <ToggleSwitch colors={this.props.colors} toggleDarkMode={this.props.toggleDarkMode}/> */}
            </ul>
        </nav>
    )}
}

function NavbarItemList(props) {
    const navbar_labels = props.labels;
    const list = navbar_labels.map((label, i) => 
        <NavbarItem key={`key_${label}`} color={props.color} text={label} scroll={() => props.scrollTo(i)}/>
    );
    return (<div className='navbar-items-list'>{list}</div>)
}

export default Navbar;