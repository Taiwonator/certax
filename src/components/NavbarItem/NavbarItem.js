import React, { Component } from 'react';
import './NavbarItem.scss';

const NavbarItem = (props) => {
    console.log(props.color);
    let darker_color = parseInt(props.color.replace(/^#/, ''), 16);
    darker_color = (darker_color & 0xfefefe) >> 1;
    darker_color = darker_color.toString(16)
    darker_color = "#" + darker_color;

    const border_style = {
        borderColor: darker_color
    }

    const color_style = {
        color: props.color
    }

    return (
        <span style={border_style} className='navbar-item-container'>
            <p style={color_style}>{props.text}</p>
        </span>
    )};

export default NavbarItem;