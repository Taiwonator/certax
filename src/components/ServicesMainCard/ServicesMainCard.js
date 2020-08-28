import React, { Component } from 'react';
import './ServicesMainCard.scss';
import Content from '../Content/Content';

const ServicesMainCard = (props) => {
    let color = (props.serviceIndex % 2 != 0) ? props.colors.yellow : props.colors.blue;

    return (
        <div className='services-main-card-container'>
            <div className='serivces-main-card-content' style={{backgroundColor: color}}>
                <Content headertext={props.service.title}
                         paratext={props.service.info}
                         headercolor={props.colors.white}
                         paracolor={props.colors.white}
                         buttontext={'Next'}
                         buttoninverse={true}
                         buttoncolor={color}
                         buttonOnClick={props.buttonOnClick}
                         align={'left'}/>
            </div>
            <div className='services-main-card-image' style={{backgroundImage: `url(${props.service.image})` }}/>
        </div>
    )
}

export default ServicesMainCard;