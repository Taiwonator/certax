import React, { Component } from 'react';
import './ToggleButton.scss';

const ToggleButton = (props) => (
    <div className="toggle-button-container">
        <svg id="toggle-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64.47 58.31">
            <rect fill={props.color} x="990.89" y="471.22" width="3.44" height="64.29" transform="translate(-484.43 987.87) rotate(-89.23)" />
            <rect fill={props.color} x="990.82" y="498.22" width="3.44" height="64.29" transform="translate(-511.49 1014.44) rotate(-89.23)" />
            <rect fill={props.color} x="990.75" y="525.22" width="3.44" height="64.29" transform="translate(-538.56 1041) rotate(-89.23)" />
        </svg>
    </div>
)

export default ToggleButton;