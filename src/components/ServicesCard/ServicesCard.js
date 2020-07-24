import React, { Component } from 'react';
import './ServicesCard.scss';
import Subheader from '../Subheader/Subheader';
import useWindowDimensions from '../../helperFunctions/useWindowDimensions';

const ServicesCard = (props) => {
    let {width} = useWindowDimensions();

    let color = (props.index % 2 != 0) ? props.colors.yellow : props.colors.blue;
    let backgroundImage = (width >= 0 && width <= 1024) ? props.service.image : 'null';

    return (
    <div style={{backgroundColor: color}} className='services-card-container'>
        <div className='services-card-content'>
            <Subheader text={props.service.title} underline={true} stars={false} color={color}/>
            <p style={{color}}>READ MORE<i className='fa fa-long-arrow-right'></i></p>
        </div>
        <div style={{backgroundImage: `url(${backgroundImage})`}} className='services-card-face'></div>
    </div>
    )
}

export default ServicesCard;