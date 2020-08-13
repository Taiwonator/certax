import React, { Component } from 'react';
import './QuotationQuestions.scss';
import QuotationQuestion from '../../components/QuotationQuestion/QuotationQuestion';

const QuotationQuestions = (props) => {
    return ( 
    <div className='quotation-questions-container'>
        <Bar text='General Information' color={props.colors.blue} />
        <div className='quotation-questions-block'>
            <div className='quotation-questions-row'>
                <QuotationQuestion color={props.colors.blue} type={'multi'}/>
                <QuotationQuestion color={props.colors.blue} type={'binary'}/>
                <QuotationQuestion color={props.colors.blue} type={'number'}/>
            </div>
        </div>
        <Bar text='Services' color={props.colors.yellow} onClick={() => console.log("bar cliked")}/>
        <div className='quotation-questions-block' style={{display: 'none'}}>
            <div className='quotation-questions-row'>
                <QuotationQuestion color={props.colors.blue} type={'binary'}/>
                <QuotationQuestion color={props.colors.blue} type={'binary'}/>
            </div>
            <div className='quotation-questions-row'>
                <QuotationQuestion color={props.colors.blue} type={'binary'}/>
                <QuotationQuestion color={props.colors.blue} type={'binary'}/>
            </div>
        </div>
    </div> 
    );
}

const Bar = (props) => {
   return ( 
    <div className='quotation-questions-bar' style={{backgroundColor: props.color}} onClick={props.onClick}>
        <p>{props.text}</p>
    </div> 
    );
}
 
export default QuotationQuestions;