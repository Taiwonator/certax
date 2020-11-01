import React, { Component } from 'react';
import './Footer.scss';

const Footer = (props) => {
    return (
        <>
        <div className='footer-images'>
            <img src="https://www.chevening.org/wp-content/uploads/2019/09/ICAEW-logo-small.png" alt="nope"/>
            <img src="https://www.aelmarkhams.co.uk/wp-content/uploads/2018/11/XERO-Logo.png" alt="nope"/>
        </div>
        <div className='footer-container'>
            <div className='footer-left'>
                <p style={{color: props.colors.blue}}>Copyright © 2020, Certax Accounting</p>
                <p>Certax Accounting (Central & East Norwich)</p>
                <p>Ltd Regus UK</p>
                <p>Cavell House, Stannard Place St. Crispins Road</p>
                <p>Norwich, NR3 1YE</p>
                <p>Tel: 01603 821014</p>
                <p>Company number: 8167643    Registered in England</p>
            </div>
            <div className='footer-right'>
                <a onClick={props.homescroll} style={{color: props.colors.yellow}}>Home</a>
                <FooterItemList labels={props.labels} scrolls={props.label_scrolls}/>
            </div>
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