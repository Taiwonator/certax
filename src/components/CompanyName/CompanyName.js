import React, { Component } from 'react';
import './CompanyName.scss';

const CompanyName = (props) => (
    <div className="company-name-container">
        <h1 style={{color: props.colors.blue}}>CERTAX</h1>
        <h2 style={{color: props.colors.lightblue}}><span>accounting</span></h2>
        <h3 style={{color: props.colors.yellow}}>{`Professional Accountants & Tax Advisers`}</h3>
    </div>
);

export default CompanyName;