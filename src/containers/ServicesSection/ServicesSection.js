import React, { Component } from 'react';
import './ServicesSection.scss';
import Subheader from '../../components/Subheader/Subheader';
import Services from '../Services/Services';
import ScrollDownButton from '../../components/ScrollDownButton/ScrollDownButton';

function ServicesSection(props) {
    return (
        <div className='services-section-container'>
            <Subheader text='SERVICES' underline={true} stars={false} color={props.colors.yellow} />
            <Services darkMode={props.darkMode} colors={props.colors} services={props.data} />
            <ScrollDownButton color={props.colors.blue} />
        </div>
    ) 
}

export default ServicesSection;