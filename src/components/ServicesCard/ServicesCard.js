import React, { Component } from 'react';
import './ServicesCard.scss';
import Subheader from '../Subheader/Subheader';

const ServicesCard = (props) => {
    let color = (props.index % 2 != 0) ? props.colors.yellow : props.colors.blue;
    return (
    <div style={{backgroundColor: color}} className='services-card-container'>
        <div className='services-card-content'>
            <Subheader text={props.service.title} underline={true} stars={false} color={color}/>

        </div>
        <div className='services-card-face'></div>
    </div>
    )
}

export default ServicesCard;