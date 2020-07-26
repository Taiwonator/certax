import React, { Component } from 'react';
import './TestimonialSection.scss';
import Subheader from '../../components/Subheader/Subheader';
import BigTestimony from '../BigTestimony/BigTestimony';
import QuoteCarousel from '../../components/QuoteCarousel/QuoteCarousel';
import TGraphic from '../../components/TGraphic/TGraphic';

const TestimonialSection = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className='testimonial-section-container'>
            <Subheader text='HEAR WHAT MY CLIENTS HAVE TO SAY' color={props.colors.yellow} underline={false} stars={true}/>
            <TGraphic color={props.colors.yellow} translateY={10}/> 
            <BigTestimonyList testimonials={props.data.bigtestimonials} colors={props.colors}/>
            <QuoteCarousel testimonials={props.data.minitestimonials} colors={props.colors}/>
        </div>
    ) 
})

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
