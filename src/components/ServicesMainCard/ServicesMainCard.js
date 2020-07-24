import React, { Component } from 'react';
import './ServicesMainCard.scss';
import Content from '../Content/Content';

const ServicesMainCard = (props) => {

    return (
        <div className='services-main-card-container'>
            <div className='serivces-main-card-content' style={{backgroundColor: props.backgroundColor}}>
                <Content headertext={props.service.title}
                         paratext={props.service.info}
                         headercolor={props.colors.white}
                         paracolor={props.colors.white}
                         buttontext={'Next'}
                         buttoncolor={props.colors.yellow}
                         align={'left'}/>
            </div>
            <div className='services-main-card-image' style={{backgroundImage: `url(${props.service.image})` }}/>
        </div>
    )
}

export default ServicesMainCard;