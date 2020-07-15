import React, { Component } from 'react';
import './TestimonialSection.scss';
import Subheader from '../../components/Subheader/Subheader';

function TestimonialSection (props) {
    return (
        <div className='testimonial-section-container'>
            <Subheader text='HEAR WHAT MY CLIENTS HAVE TO SAY' color={props.colors.yellow} underline={true}/>
        </div>
    )
}

export default TestimonialSection;

//testimonial-section-container
//--Header
//----Title 
//----Stars

//--TestimonyBox
//----Quote
//----Image
//--TestimonyBox
//----Quote
//------Text
//------Author
//----Image

//--TestimonyCarasel
//----Back
//----Forward
//----SmallBoxContainer
//------TestimonySmallBoxes
//--------Text
//--------Author
