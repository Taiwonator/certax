import React, { Component } from 'react';
import './TestimonialSection.scss';
import Subheader from '../../components/Subheader/Subheader';
import BigTestimony from '../BigTestimony/BigTestimony';

function TestimonialSection (props) {
    return (
        <div className='testimonial-section-container'>
            <Subheader text='HEAR WHAT MY CLIENTS HAVE TO SAY' color={props.colors.yellow} underline={false}/>
            <TGraphic color={props.colors.yellow}/> 
            <BigTestimonyList testimonials={props.data.bigtestimonials} colors={props.colors}/>
        </div>
    )
}

const BigTestimonyList = (props) => {
    let big_testimonials = props.testimonials;
    let list = big_testimonials.map((test, i) => (
            <BigTestimony key={i} testimony={test} child={i} colors={props.colors}/>
    ));
    return (
        <div>
            {list}
        </div>
    )
}

const TGraphic = (props) => {
    const style = {
        width: '50px', 
        transform: 'translateY(10px)'
    }
    return ( 
        <svg viewBox="0 0 64 134.5" width='60' style={style}>
            <line fill='none' stroke={props.color} x1="32" y1="9.5" x2="32" y2="134.5" strokeWidth='2' />
            <line fill='none' stroke={props.color} y1="9.5" x2="64" y2="9.5" strokeWidth='2'/>
            <line fill='none' stroke={props.color} x1="47" y1="0.5" x2="17" y2="0.5" strokeWidth='2' />
        </svg>
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
