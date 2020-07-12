import React, { Component } from 'react';
import './CompanyName.scss';

const CompanyName = (props) => (
    <div className="company-name-container">
        <h1 style={{color: props.colors.blue}}>CERTAX</h1>
        <h2 style={{color: props.colors.lightblue}}><span>accounting</span></h2>
    </div>
);

export default CompanyName;