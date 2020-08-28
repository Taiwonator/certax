import React, { Component } from 'react';
import './QuotationQuestion.scss';
import Input from '../Input/Input';

const QuotationQuestion = (props) => {    
    return ( 
    <div className={`quotation-question-container ${(props.locked) ? 'locked' : ''}`}>
        <div className='quotation-question-text-container'>
            <div className='quotation-question-text'>
                <h3 style={{color: props.color}}>{props.question}</h3>
                <p>{props.info}</p>
            </div>
            <Input answerKey={props.answerKey} question={props.question} answer={props.answer} selections={props.selections} locked={props.locked} type={props.type} updateAnswer={props.updateAnswer} color={props.color}/>
       </div>
    </div> 
    );
}
 
export default QuotationQuestion;