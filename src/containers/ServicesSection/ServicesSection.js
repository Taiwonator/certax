import React, { Component } from 'react';
import './ServicesSection.scss';
import Subheader from '../../components/Subheader/Subheader';
import Services from '../Services/Services';

function ServicesSection(props) {
    return (
        <div className='services-section-container'>
            <Subheader text='SERVICES' underline={true} stars={false} color={props.colors.yellow}/>
            <Services services={props.data} />
        </div>
    ) 
}

export default ServicesSection;