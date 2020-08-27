import React, { Component } from 'react';
import './QuotationQuestions.scss';
import QuotationQuestion from '../../components/QuotationQuestion/QuotationQuestion';
import {chunk} from '../../helperFunctions/arrayOperations';

const QuotationQuestions = (props) => {
    console.log(props.questions);
    return ( 
    <div className='quotation-questions-container'>
        <BlockList questions={props.questions} color={props.colors.blue}/>

        <Bar text='MORE QUESTIONS' color={props.colors.yellow} onClick={() => props.getNewBatch({}, 0)}/>
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

const Block = (props) => {
    let questions_chunked = chunk(props.questions, 3);
    if(props.questions.length == 4) {
        questions_chunked = chunk(props.questions, 2);
    }
    let rows = questions_chunked.map(row => 
        <Row key={`row_${row[0].key}_${row.length}`} questions={row} color={props.color}/>
    )

    return (
        <div className='quotation-questions-block'>
            <Bar text='' color={props.color} />
            {rows}
        </div>
    )
}

const BlockList = (props) => {
    let question_arrays = props.questions;
    let list = question_arrays.map(array => 
        <Block key={`block_${array[0].key}_${array.length}`} questions={array} color={props.color} />
    )
    return (
        <>{list}</>
    )
}

const Row = (props) => {
    return (
            <div className='quotation-questions-row'>
                <QuotationQuestionList questions={props.questions} color={props.color} />
            </div>
    )
}

const QuotationQuestionList = (props) => {
    const questions = props.questions;
    let list = questions.map((question) => 
        <QuotationQuestion key={question.key} question={question.displayValue} type={question.type} color={props.color}/>
    )
    return (
        <>{list}</>
    )
}
 
export default QuotationQuestions;