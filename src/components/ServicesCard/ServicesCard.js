import React, { Component } from 'react';
import 'react-fontawesome';
import './ServicesCard.scss';
import Subheader from '../Subheader/Subheader';
import useWindowDimensions from '../../helperFunctions/useWindowDimensions';
import FontAwesome from 'react-fontawesome';

const ServicesCard = (props) => {
    let {width} = useWindowDimensions();

    let color = (props.index % 2 != 0) ? props.colors.yellow : props.colors.blue;
    let backgroundImage = (width >= 0 && width <= 1024) ? props.service.image : 'null';

    let active_style = {
        opacity: 0, 
        color: props.colors.white, 
        backgroundColor: props.colors.white
    }

    let style = (props.index == props.activeIndex) ? active_style : {};

    if(props.activeIndex == props.index) {
        console.log(props.service.title);
    }

    return (
    <div onClick={props.onClick} style={{backgroundColor: color}} className='services-card-container'>
        <div className={`services-card-content ${(props.index == props.activeIndex) ? 'active-index' : ''}`}>
            <Subheader text={props.service.title} underline={true} stars={false} color={color}/>
            <p style={{color}}>READ MORE <FontAwesome name="long-arrow-right" /></p>
        </div>
        <div style={{backgroundImage: `url(${backgroundImage})`, borderColor: color, opacity: style.opacity}} className='services-card-face'></div>
    </div>
    )
}

export default ServicesCard;