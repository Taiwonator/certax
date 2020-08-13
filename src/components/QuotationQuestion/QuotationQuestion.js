import React, { Component } from 'react';
import './QuotationQuestion.scss';
import Input from '../Input/Input';

const QuotationQuestion = (props) => {
    return ( 
    <div className='quotation-question-container' style={{borderColor: props.color}}>
       <Input />
    </div> 
    );
}
 
export default QuotationQuestion;