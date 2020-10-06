import React, { Component } from 'react';
import './GetAQuote.scss';
import Content from '../../components/Content/Content';
import QuotationQuestions from '../QuotationQuestions/QuotationQuestions';
import { getBatch, getABatchMock } from '../../mocking/Batch';
import { getABatch } from '../../apitest/QuoteFunctions';
import 'regenerator-runtime/runtime';

class GetAQuote extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           questions: [],
           answers: {},
           batch: 0, 
           quote: 0,
           moreQuestionsAvailable: true, 
           active: false, 
           allInputsFilled: false,
           lockedAnswers: {}, 
           requestProcessing: false
        }
        // console.log(this.increment(1000, 1, true));
        this.ref = React.createRef();
    }

    getNewBatch = async () => {
        this.lockAnswers();
        let batchObj = await this.getBatchObj(this.state.answers, this.state.questions, this.state.batch, this.state.moreQuestionsAvailable, this.state.quote);
        // let batchObj = await this.mockBatch(this.state.answers, this.state.batch);
        let keys = batchObj.newQuestions.map(a => a.key);
        let answersObj = this.state.answers;
        for(var i = 0; i < keys.length; i++) {
            if(batchObj.newQuestions[i].type == 'number' || batchObj.newQuestions[i].type == 'bignumber') {
                answersObj[keys[i]] = 0;
            } else {
                answersObj[keys[i]] = null;
            }
        }
        if(this.state.requestProcessing) {
            if(batchObj.newQuestions.length != 0) {
                this.setState((prevState) => ({
                    answers: answersObj,
                    questions: [...prevState.questions, batchObj.newQuestions], 
                    batch: batchObj.batch, 
                    moreQuestionsAvailable: batchObj.moreQuestionsAvailable, 
                    quote: batchObj.quote, 
                    active: true, 
                    allInputsFilled: false, 
                    requestProcessing: false
                    
                }), () => {this.props.scrollToQuoteQuestions(this.ref);})

            } else {
                this.setState((prevState) => ({
                    moreQuestionsAvailable: batchObj.moreQuestionsAvailable, 
                    active: false, 
                    quote: batchObj.quote, 
                    batch: batchObj.batch
                }))
                this.props.scrollToQuote();
            }
        }
    }


    getBatchObj = (answers, questions, batch, moreQuestionsAvailable, quote) => {
        this.setState({
            requestProcessing: true
        })
        if(batch == 0) {
            return getABatch(answers, questions, batch, moreQuestionsAvailable);
        } else {
            return getABatch(answers, questions, batch, moreQuestionsAvailable, quote);
        }
        // return getABatchMock(this.state.answers, this.state.batch + 1);
    }

    mockBatch = (answers, batch) => {
        this.setState({
            requestProcessing: true
        })
        return getABatchMock(answers, batch + 1);
    }

    reset = () => {
        const batchObj = getBatch({}, 0);
        this.setState({
            questions: [], 
            answers: [],
            batch: 0, 
            moreQuestionsAvailable: batchObj.moreQuestionsAvailable,
            quote: 0, 
            active: false, 
            allInputsFilled: false, 
            lockedAnswers: {}
        })
    }

    updateAnswer = (key, value, int) => {
        if(int) {
            if(value.length != 0) {
                value = parseInt(value);
                if(value < 0) {
                    value = 0;
                }
            } else {
                value = 0;
            }
        } else {
            value = String(value);
        }
        this.setState((prevState) => ({
            answers: {
                ...prevState.answers,
                [key]: value
            }
        }), () => this.checkInputs());
    }

    checkInputs = () => {
        var answers = this.state.answers;
        if(Object.values(answers).includes(null)) {
            
        } else {
            this.setState({
                allInputsFilled: true
            })
        }
    }

    returnQuote = () => {
        return (this.state.quote / 12).toFixed(2)
    }

    lockAnswers = () => {
        var answers = this.state.answers;
        let lockedAnswers = {};
        for(var i = 0; i < Object.keys(answers).length; i++) {
            lockedAnswers[Object.keys(answers)[i]] = true;
        }
        this.setState({
            lockedAnswers
        })
    }

    scrollToMyRef = (ref, yOffset) => {
        window.scrollTo(0, ref.current.offsetTop + yOffset);
    }

    increment = (value, step, increase) => {
        let out;
        const mult = (step > 0) ? 1 : -1;
        if(increase) {
            if(value >= 0 && value < 10) {
                out = value + (step*1);
            } else {
                const upperTen = Math.pow(10, Math.ceil(Math.log10(value + mult)));
                out = value + (step*(upperTen / 10));
            }
        } else {
            if(value + step >= 0) {
                out = value + step;
            } else {
                out = 0;
            }
        }
        return out;
    }

    render() { 
        let content;
        if(!this.state.active && this.state.questions.length == 0) {
            content = <Content headertext='Instant Quotation'
                                paratext='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dapibus sollicitudin luctus. Ut finibus non purus at pulvinar. Quisque tincidunt est at arcu efficitur ultrices.'
                                headercolor={this.props.colors.white}
                                paracolor={this.props.colors.white}
                                align={'left'}
                                buttontext='Start now'
                                buttoncolor={this.props.colors.white}
                                buttoninverse={false}
                                buttonOnClick={this.getNewBatch}
                                text={[{
                                    type: "para", 
                                    text: "As stated previously, our fees are calculated on a fixed fee basis, so you know upfront the cost of the services required with no hidden charges.", 
                                }]}/>
        } else {
            content = <Content headertext='Instant Quotation'
                         paratext=''
                         headercolor={this.props.colors.white}
                         paracolor={this.props.colors.white}
                         align={'left'}
                         buttontext='Reset'
                         buttoncolor={this.props.colors.yellow}
                         buttoninverse={true}
                         buttonOnClick={this.reset}
                         text={[{
                            type: "para", 
                            text: "As stated previously, our fees are calculated on a fixed fee basis, so you know upfront the cost of the services required with no hidden charges.", 
                        }]}/>
        } 
        return ( 
        <div className='get-a-quote-container'>
            <div className='get-a-quote-card' style={{backgroundColor: this.props.colors.blue}}>
                <div className='get-a-quote-card-content'>
                    {content}
                </div>
                <div className='get-a-quote-card-image-container'>
                    <div className='get-a-quote-card-image'/>
                    <div className='get-a-quote-price-container'>
                        <h3>YOUR APPROX. PRICE</h3>
                        <div className='get-a-quote-price'>
                            <p className='get-a-quote-price-currency'>£</p>
                            <p className='get-a-quote-price-value'>{(this.state.quote / 12).toFixed(2)}</p>
                            <p className='get-a-quote-price-per'>/mon</p>
                        </div>
                    </div>
                </div>
            </div>

            <QuotationQuestions questions={this.state.questions} 
                                colors={this.props.colors} 
                                answers={this.state.answers} 
                                lockedAnswers={this.state.lockedAnswers}
                                quoteState={{active: this.state.active, moreQuestionsAvailable: this.state.moreQuestionsAvailable, allInputsFilled: this.state.allInputsFilled}}  
                                ref={this.ref}
                                updateAnswer={this.updateAnswer} 
                                getNewBatch={this.getNewBatch} 
                                increment={this.increment}/> 
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
// Not allow submission unless all fields filled out  X
// Fix number input X
// Lock inputs X
// Create Start Again feature X

// Fix returning questions multiple times
