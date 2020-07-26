import React, { Component } from 'react';
import './GetAQuoteSection.scss';
import TGraphic from '../../components/TGraphic/TGraphic';
import Subheader from '../../components/Subheader/Subheader';
import GetAQuote from '../GetAQuote/GetAQuote';

const GetAQuoteSection = React.forwardRef((props, ref) => {
        let darkmode_colors = props.colors;
        darkmode_colors = {
            white: props.colors.black, 
            textblack: props.colors.white
        }
        let colors = props.colors;

        if (props.darkMode()) {
            colors = darkmode_colors;
        } else {
            colors = props.colors;
        }

        return (
            <div ref={ref} className='get-a-quote-section-container'>
                <Subheader text='WANT TO SEE YOUR QUOTE?' color={props.colors.yellow} underline={false}/>
                <TGraphic color={props.colors.textblack} topcolor={props.colors.yellow}/>
                <GetAQuote colors={colors} content={props.data}/>
            </div>
        )
})

export default GetAQuoteSection;

