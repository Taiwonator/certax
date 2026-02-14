import React, { Component } from 'react';
import './Subheader.scss';
import Underline from '../Underline/Underline';

const Subheader = (props) => {

    return (
        <div className='subheader-container'>
            <h3 style={{ color: props.color }}>{props.text}</h3>
            <h4 style={{ color: props.subtextcolor }}>{props.subtext}</h4>
            <Underline color={props.color} justifyContent='center' hide={!props.underline} />
            <Stars color={props.color} hide={!props.stars} />
        </div>
    )
}

const Stars = props => {
    let display = 'block';
    if (props.hide) {
        display = 'none';
    } else {
        display = 'block';
    }

    return (
        <svg style={{ display }} xmlns="https://www.w3.org/2000/svg" viewBox="0 0 324.26 48.29" className='stars'>
            <path fill={props.color} stroke={props.color} strokeMiterlimit='10' d="M642.5,533.85l6-17.34,6.15,17.34h18.07l-14.62,10.86L663.69,562l-14.76-10.66L633.83,562l5.82-16.75L624.49,534Z" transform="translate(-623 -515)" />
            <path fill={props.color} stroke={props.color} strokeMiterlimit='10' d="M710.75,533.85l6-17.34,6.16,17.34H741l-14.63,10.86L731.93,562l-14.76-10.66L702.07,562l5.83-16.75L692.74,534Z" transform="translate(-623 -515)" />
            <path fill={props.color} stroke={props.color} strokeMiterlimit='10' d="M779,533.85l6-17.34,6.16,17.34h18.07l-14.63,10.86L800.18,562l-14.76-10.66L770.32,562l5.83-16.75L761,534Z" transform="translate(-623 -515)" />
            <path fill={props.color} stroke={props.color} strokeMiterlimit='10' d="M847.24,533.85l6-17.34,6.15,17.34h18.07l-14.62,10.86L868.43,562l-14.76-10.66L838.57,562l5.82-16.75L829.23,534Z" transform="translate(-623 -515)" />
            <path fill={props.color} stroke={props.color} strokeMiterlimit='10' d="M915.49,533.85l6-17.34,6.16,17.34h18.07l-14.63,10.86L936.67,562l-14.76-10.66L906.81,562l5.83-16.75L897.48,534Z" transform="translate(-623 -515)" />
        </svg>
    )
}


export default Subheader;