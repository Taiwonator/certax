import React, { Component } from 'react';
import './ServicesSection.scss';
import Subheader from '../../components/Subheader/Subheader';
import Services from '../Services/Services';
import ScrollDownButton from '../../components/ScrollDownButton/ScrollDownButton';

const ServicesSection = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className='services-section-container'>
            <Subheader text='SERVICES' underline={true} stars={false} color={props.colors.yellow} />
            <Services darkMode={props.darkMode} colors={props.colors} services={props.data} />
            <ScrollDownButton scroll={props.scroll} color={props.colors.blue} />
        </div>
    ) 
})

export default ServicesSection;