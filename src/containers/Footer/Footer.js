import React, { Component } from 'react';
import './Footer.scss';

const Footer = (props) => {
    return (
        <>
        <div className='footer-container'>
            <div className='footer-left'>
                <a style={{color: props.colors.blue}}>Copyright © 2020, Certax Accounting</a>
            </div>
            <div className='footer-right'>
                <a onClick={props.homescroll} style={{color: props.colors.yellow}}>Home</a>
                <FooterItemList labels={props.labels} scrolls={props.label_scrolls}/>
            </div>
        </div>
        <div className='footer-images'>
            <img src="https://www.chevening.org/wp-content/uploads/2019/09/ICAEW-logo-small.png" alt="nope"/>
            <img src="https://www.aelmarkhams.co.uk/wp-content/uploads/2018/11/XERO-Logo.png" alt="nope"/>
        </div>
        </>
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