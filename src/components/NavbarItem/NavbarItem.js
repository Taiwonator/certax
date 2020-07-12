import React, { Component } from 'react';
import './NavbarItem.scss';

const NavbarItem = (props) => {
    console.log(props.color);
    let darker_color = parseInt(props.color.replace(/^#/, ''), 16);
    darker_color = (darker_color & 0xfefefe) >> 1;
    darker_color = darker_color.toString(16)
    darker_color = "#" + darker_color;
    console.log(darker_color);

    return (
        <span style={{borderColor: darker_color}} className='navbar-item-container'>
            <p style={{color: props.color}}>{props.text}</p>
        </span>
    )};

export default NavbarItem;