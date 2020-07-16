import React, { Component } from 'react';
import './GetAQuoteSection.scss';
import TGraphic from '../../components/TGraphic/TGraphic';
import Subheader from '../../components/Subheader/Subheader';
import GetAQuote from '../GetAQuote/GetAQuote';

function GetAQuoteSection (props) {
        return (
            <div className='get-a-quote-section-container'>
                <Subheader text='WANT TO SEE YOUR QUOTE?' color={props.colors.yellow} underline={false}/>
                <TGraphic color={props.colors.textblack} topcolor={props.colors.yellow}/>
                <div className='get-a-quote-graphic-container'>
                    <GetAQuote colors={props.colors} content={props.data}/>
                </div>
            </div>
        )
}

export default GetAQuoteSection;

