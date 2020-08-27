import React, { Component } from 'react';
import './QuotationQuestion.scss';
import Input from '../Input/Input';

const QuotationQuestion = (props) => {
    return ( 
    <div className='quotation-question-container' style={{borderColor: props.color}}>
        <div className='quotation-question-text'>
            <h3 style={{color: props.color}}>{props.question}</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing</p>
        </div>
       <Input answerKey={props.answerKey} question={props.question} answer={props.answer} type={props.type} updateAnswer={props.updateAnswer} color={props.color}/>
    </div> 
    );
}
 
export default QuotationQuestion;