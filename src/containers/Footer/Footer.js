import React, { Component } from 'react';
import './Footer.scss';

const Footer = (props) => {
    return (
        <footer>
            <div className='footer-images'>
                <img src="https://www.chevening.org/wp-content/uploads/2019/09/ICAEW-logo-small.png" alt="ICAEW - Institute of Chartered Accountants in England and Wales" />
                <img width={100} src="https://upload.wikimedia.org/wikipedia/commons/5/57/Xero-logo-hires-RGB.png?20131106042228" alt="Xero Cloud Accounting Software Partner" />
            </div>
            <div className='footer-container'>
                <div className='footer-left'>
                    <p style={{ color: props.colors.blue }}>Copyright © 2020, Certax Accounting</p>
                    <p>Certax Accounting (Central & East Norwich) Ltd </p>
                    <p>Regus UK Cavell House, Stannard Place St. Crispins Road</p>
                    <p>Norwich, NR3 1YE</p>
                    <p>Tel: <a href="tel:+441603821014">01603 821014</a></p>
                    <p>Company number: 8167643    Registered in England</p>
                </div>
                <nav className='footer-right' aria-label="Footer navigation">
                    <a onClick={props.homescroll} style={{ color: props.colors.yellow }} role="button" tabIndex={0} onKeyPress={(e) => e.key === 'Enter' && props.homescroll()}>Home</a>
                    <FooterItemList labels={props.labels} scrolls={props.label_scrolls} />
                </nav>
            </div>

        </footer>
    );
}

const FooterItemList = (props) => {
    let labels = props.labels;
    let list = labels.map((label, i) => (
        <a key={i} onClick={props.scrolls[i]} role="button" tabIndex={0} onKeyPress={(e) => e.key === 'Enter' && props.scrolls[i]()}>{label}</a>
    ));

    return (
        <>{list}</>
    )
}

export default Footer;