import React, { Component } from 'react';
import './GetAQuote.scss';
import Content from '../../components/Content/Content';
import QuotationQuestions from '../QuotationQuestions/QuotationQuestions';
import {getBatch} from '../../mocking/Batch';

class GetAQuote extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           questions: [],
           answers: {isSelfAssessment: false},
           batch: 0, 
           quote: 0,
           moreQuestionsAvailable: true, 
           active: false
        }
    }

    start = () => {
        const batchObj = getBatch(this.state.answers, 1);
        if(this.state.batch <= 1) {
            this.setState({
                questions: [batchObj.newQuestions], 
                batch: 1, 
                moreQuestionsAvailable: batchObj.moreQuestionsAvailable, 
                quote: 0, 
                active: true
            })
        }
    }

    getNewBatch = () => {
        const batchObj = getBatch(this.state.answers, this.state.batch + 1);
        let keys = batchObj.newQuestions.map(a => a.key);
        let answersObj = this.state.answers;
        for(var i = 0; i < keys.length; i++) {
            answersObj[keys[i]] = 0;
        }

        if(batchObj.moreQuestionsAvailable) {
            this.setState((prevState) => ({
                answers: answersObj,
                questions: [...prevState.questions, batchObj.newQuestions], 
                batch: prevState.batch + 1, 
                moreQuestionsAvailable: batchObj.moreQuestionsAvailable, 
                quote: batchObj.quote
            }))
        } else {
            this.setState((prevState) => ({
                moreQuestionsAvailable: batchObj.moreQuestionsAvailable, 
                active: false
            }))
            this.props.scrollToQuote();
        }
    }

    reset = () => {
        const batchObj = getBatch({}, 0);
        this.setState({
            questions: [], 
            answers: [],
            batch: 0, 
            moreQuestionsAvailable: batchObj.moreQuestionsAvailable,
            quote: 0
        })
    }

    updateAnswer = (key, value) => {
        if(value < 0) {
            value = 0;
        }
        this.setState((prevState) => ({
            answers: {
                ...prevState.answers,
                [key]: value
            }
        }));
    }

    render() { 
        return ( 
        <div className='get-a-quote-container'>
            <div className='get-a-quote-card' style={{backgroundColor: this.props.colors.blue}}>
                <div className='get-a-quote-card-content'>
                <Content headertext='Instant Quotation'
                         paratext='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dapibus sollicitudin luctus. Ut finibus non purus at pulvinar. Quisque tincidunt est at arcu efficitur ultrices.'
                         headercolor={this.props.colors.white}
                         paracolor={this.props.colors.white}
                         align={'left'}
                         buttontext={'Start now'}
                         buttonOnClick={this.start}/>
                </div>
                <div className='get-a-quote-card-image-container'>
                    <div className='get-a-quote-card-image'/>
                    <div className='get-a-quote-price-container'>
                        <h3>YOUR PRICE</h3>
                        <div className='get-a-quote-price'>
                            <p className='get-a-quote-price-currency'>£</p>
                            <p className='get-a-quote-price-value'>{this.state.quote}</p>
                            <p className='get-a-quote-price-per'>/mon</p>
                        </div>
                    </div>
                </div>
            </div>

            <QuotationQuestions questions={this.state.questions} colors={this.props.colors} answers={this.state.answers} quoteState={{active: this.state.active, moreQuestionsAvailable: this.state.moreQuestionsAvailable}}  updateAnswer={this.updateAnswer} start={this.start} getNewBatch={this.getNewBatch}/>
        </div>
        );
    }
}
 
export default GetAQuote;

// [
//     [
//         {},
//     ], 
//     [
//         {},
//     ]
// ]

//BACKEND
// Need selection options {key: value, ..., key: value}
// Need explanation string

//FRONTEND
// Scroll up when finished X
// Not allow submission unless all fields filled out
// Fix number input X
// Lock inputs
