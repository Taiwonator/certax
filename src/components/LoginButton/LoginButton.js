import React, { Component, useState } from 'react';
import './LoginButton.scss';

const LoginButton = (props) => {
    return ( 
        <div className='login-button' style={{backgroundColor: props.login_state.color}} onClick={props.onClick}>
            {props.login_state.text}
        </div>
    );
}
 
export default LoginButton;