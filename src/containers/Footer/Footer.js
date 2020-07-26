import React, { Component } from 'react';
import './Footer.scss';

const Footer = (props) => {
    return (
        <div className='footer-container'>
            <div className='footer-left'>
                <a style={{color: props.colors.blue}}>Copyright © 2020, Certax Accounting</a>
            </div>
            <div className='footer-right'>
                <a onClick={props.homescroll} style={{color: props.colors.yellow}}>Home</a>
                <FooterItemList labels={props.labels} scrolls={props.label_scrolls}/>
            </div>
        </div>
    );
}

const FooterItemList = (props) => {
    let labels = props.labels;
    let list = labels.map((label, i) => (
        <a key={i} onClick={props.scrolls[i]} >{label}</a>
    ));

    return (
    <>{list}</>
    )
}
 
export default Footer;