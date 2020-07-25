import React, { Component } from 'react';
import './Footer.scss';

const Footer = (props) => {
    return (
        <div className='footer-container'>
            <div className='footer-left'>
                <a href='#' style={{color: props.colors.blue}}>Copyright © 2020, Certax Accounting</a>
            </div>
            <div className='footer-right'>
                <a style={{color: props.colors.yellow}} href='#'>Home</a>
                <a href='#'>About</a>
                <a href='#'>Testimonials</a>
                <a href='#'>Quote</a>
                <a href='#'>Services</a>
                <a href='#'>Contact</a>
            </div>
        </div>
    );
}
 
export default Footer;