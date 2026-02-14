import React, { Component } from 'react';
import './ToggleSwitch.scss';

const ToggleSwitch = (props) => {
    return (
        <label className="toggle-switch-container">
            <input type="checkbox" />
            <span style={{backgroundColor: props.colors.yellow}} onClick={props.toggleDarkMode} className="slider"></span>
        </label>
    );
}
 
export default ToggleSwitch;