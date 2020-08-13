import React, { Component } from 'react';
import './QuotationQuestions.scss';
import QuotationQuestion from '../../components/QuotationQuestion/QuotationQuestion';

const QuotationQuestions = (props) => {
    return ( 
    <div className='quotation-questions-container'>
        <Bar text='General Information' color={props.colors.blue}/>
        <div className='quotation-questions-row'>
            <QuotationQuestion color={props.colors.blue}/>
            <QuotationQuestion color={props.colors.blue}/>
            <QuotationQuestion color={props.colors.blue}/>
        </div>

    </div> 
    );
}

const Bar = (props) => {
   return ( 
    <div className='quotation-questions-bar' style={{backgroundColor: props.color}}>
        <p>{props.text}</p>
    </div> 
    );
}
 
export default QuotationQuestions;