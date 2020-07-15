import React, { Component } from 'react';
import './Underline.scss';

const Underline = (props) => (
    <div className='underline' style={{justifyContent: props.justifyContent}}>
        <div style={{backgroundColor: props.color}}/>
    </div>
)

export default Underline;