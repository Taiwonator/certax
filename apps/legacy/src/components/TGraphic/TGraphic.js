import React, { Component } from 'react';
import './TGraphic.scss';

const TGraphic = (props) => {
    const style = {
        width: '50px', 
        transform: `translateY(${props.translateY}px)`
    }

    return ( 
        <svg viewBox="0 0 64 134.5" width='60' style={style}>
            <line fill='none' stroke={props.color} x1="32" y1="9.5" x2="32" y2="134.5" strokeWidth='1.5' />
            <line fill='none' stroke={props.color} y1="9.5" x2="64" y2="9.5" strokeWidth='1.5'/>
            {/* //will be same color as the rest if no top color defined */}
            <line fill='none' stroke={`${(props.topcolor == null) ? props.color : props.topcolor}`} x1="47" y1="0.5" x2="17" y2="0.5" strokeWidth='2' />
        </svg>
    )
}
 
export default TGraphic;