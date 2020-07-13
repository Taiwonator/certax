import React, { Component } from 'react';
import './ToggleButton.scss';


const ToggleButton = (props) => {
    let background_color = props.color;
    if(props.inverse != 'true') {
        background_color = '';
    }

    return (
    <div style={{backgroundColor: background_color}} className={`toggle-button-container ${props.shape} ${(props.inverse != 'true') ? '' : 'inverse'}`} onClick={props.toggleNavbar}>
        <svg id="toggle-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64.47 58.31">
            <rect fill={props.color} className="bars" x="990.89" y="471.22" width="3.44" height="64.29" transform="translate(-484.43 987.87) rotate(-89.23)" />
            <rect fill={props.color} className="bars" x="990.82" y="498.22" width="3.44" height="64.29" transform="translate(-511.49 1014.44) rotate(-89.23)" />
            <rect fill={props.color} className="bars" x="990.75" y="525.22" width="3.44" height="64.29" transform="translate(-538.56 1041) rotate(-89.23)" />

            <rect fill={props.color} className="cross" x="966.31" y="450.9" width="3.44" height="79.13" transform="translate(-1002.11 366.88) rotate(-45)" />
            <rect fill={props.color} className="cross" x="928.46" y="488.74" width="79.13" height="3.44" transform="translate(-1002.11 366.88) rotate(-45)" />
        </svg>
    </div>
    )}

export default ToggleButton;
