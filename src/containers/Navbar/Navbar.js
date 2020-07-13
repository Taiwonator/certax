import React, { Component } from 'react';
import './Navbar.scss';

import CompanyTextLogo from '../../components/CompanyTextLogo/CompanyTextLogo.js';
import ToggleButton from '../../components/ToggleButton/ToggleButton.js';
import NavbarItem from '../../components/NavbarItem/NavbarItem.js';

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
    render() {
    return (
        <nav className={`navbar-container ${this.state.active ? 'navbar-active' : ''}`}>
            <div className='navbar-content'>
                <CompanyTextLogo colors={this.props.colors}/>
                <ToggleButton color={this.props.colors.blue} toggleNavbar={this.toggleNavbar} shape='bars' inverse='true'/>
            </div>
            <ul className='navbar-items'>
                <ToggleButton color={this.props.colors.yellow} toggleNavbar={this.toggleNavbar} shape='cross' inverse='true'/>
                 
                {/* <NavbarItem color={this.props.colors.yellow} text='About'/>
                <NavbarItem color={this.props.colors.yellow} text='Testimonials'/>
                <NavbarItem color={this.props.colors.yellow} text='Quote'/>
                <NavbarItem color={this.props.colors.yellow} text='Services'/>
                <NavbarItem color={this.props.colors.yellow} text='Contact Us'/> */}
                <NavbarItemList labels={this.props.labels} color={this.props.colors.yellow} />
            </ul>
        </nav>
    )}
}

function NavbarItemList(props) {
    const navbar_labels = props.labels;
    const list = navbar_labels.map((label) => 
        <NavbarItem key={`key_${label}`} color={props.color} text={label} />
    );
    return (<div className='navbar-items-list'>{list}</div>)
}

export default Navbar;