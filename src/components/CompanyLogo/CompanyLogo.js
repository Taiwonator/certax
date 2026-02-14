import React, { Component } from 'react';
import './CompanyLogo.scss';

const CompanyLogo = (props) => (
    <div className="company-logo-container">
        <svg id="certax-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 204.13 226.05" role="img" aria-label="Certax Accounting Logo">
            <title>Certax Accounting Logo</title>
            <path fill={props.colors.blue} d="M1073.65,351.91a94.52,94.52,0,0,1-13.55,88.61,99.7,99.7,0,0,0-150.69-114.4,94.61,94.61,0,0,1,164.24,25.79Z" transform="translate(-875.02 -289)" />
            <path fill={props.colors.yellow} d="M945.26,513.56A94.51,94.51,0,0,1,875,457.87a99.7,99.7,0,0,0,174-74.18,94.6,94.6,0,0,1-103.8,129.87Z" transform="translate(-875.02 -289)" />
            <path fill={props.colors.yellow} d="M970.52,341.59c12.87,0,22.36,3.56,28.46,9.65l4.57-8.13h6.27s-3.22,16.1-3.22,23.38v11.18h-7.11v-6.44c0-14.06-11-23.71-28.8-23.71-29.82,0-36.25,27.44-36.25,52.51,0,27.78,7.79,52.35,37.27,52.35,17.95,0,27.78-9.49,31.84-27.11l6.78,1c-3.39,15.92-12.54,32-40,32-33.71,0-51.16-24.06-51.16-58.79C919.19,364.46,937.32,341.59,970.52,341.59Z" transform="translate(-875.02 -289)" />
        </svg>
    </div>
);

export default CompanyLogo;