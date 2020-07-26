import React, { Component } from 'react';
import './HeaderContent.scss';
import CompanyLogo from '../../components/CompanyLogo/CompanyLogo.js';
import CompanyName from '../../components/CompanyName/CompanyName.js';
import ScrollDownButton from '../../components/ScrollDownButton/ScrollDownButton.js';

function HeaderContent(props) {
    return (
        <div className="header-content-container"> 
            <CompanyLogo colors={props.colors}/>
            <CompanyName colors={props.colors}/>
            <ScrollDownButton scroll={props.scroll} color={props.colors.blue}/> 
        </div>
    );
}

export default HeaderContent;