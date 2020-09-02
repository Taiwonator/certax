import React, { Component } from 'react';
import './GetAQuote.scss';
import Content from '../../components/Content/Content';
import QuotationQuestions from '../QuotationQuestions/QuotationQuestions';
import { getBatch } from '../../mocking/Batch';
import { getABatch } from '../../apitest/QuoteFunctions';

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
           lockedAnswers: {}
        }
        
        this.ref = React.createRef();
    }

    // start = () => {
    //     const batchObj = getBatch(this.state.answers, 1);
    //     if(!this.state.active) {
    //         this.setState({
    //             questions: [batchObj.newQuestions], 
    //             batch: 1, 
    //             moreQuestionsAvailable: batchObj.moreQuestionsAvailable, 
    //             quote: 0, 
    //             active: true, 
    //         })
    //     }
    // }

    getNewBatch = () => {
        this.lockAnswers();
        const batchObj = getABatch(this.state.answers, this.state.questions, this.state.batch + 1);
        // const batchObj = getBatch(this.state.answers, this.state.batch + 1);
        let keys = batchObj.newQuestions.map(a => a.key);
        let answersObj = this.state.answers;
        for(var i = 0; i < keys.length; i++) {
            answersObj[keys[i]] = 0;
        }
        if(batchObj.moreQuestionsAvailable) {
            this.setState((prevState) => ({
                answers: answersObj,
                questions: [...prevState.questions, batchObj.newQuestions], 
                batch: batchObj.batch, 
                moreQuestionsAvailable: batchObj.moreQuestionsAvailable, 
                quote: batchObj.quote, 
                active: true, 
                allInputsFilled: false
                
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

    updateAnswer = (key, value) => {
        if(value < 0) {
            value = 0;
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
        if(Object.values(answers).includes(0)) {
            
        } else {
            this.setState({
                allInputsFilled: true
            })
        }
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

    render() { 
        let content;
        if(!this.state.active && this.state.moreQuestionsAvailable) {
            content = <Content headertext='Instant Quotation'
                                paratext='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dapibus sollicitudin luctus. Ut finibus non purus at pulvinar. Quisque tincidunt est at arcu efficitur ultrices.'
                                headercolor={this.props.colors.white}
                                paracolor={this.props.colors.white}
                                align={'left'}
                                buttontext='Start now'
                                buttoncolor={this.props.colors.white}
                                buttoninverse={false}
                                buttonOnClick={this.getNewBatch}/>
        } else {
            content = <Content headertext='Instant Quotation'
                         paratext='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dapibus sollicitudin luctus. Ut finibus non purus at pulvinar. Quisque tincidunt est at arcu efficitur ultrices.'
                         headercolor={this.props.colors.white}
                         paracolor={this.props.colors.white}
                         align={'left'}
                         buttontext='Reset'
                         buttoncolor={this.props.colors.yellow}
                         buttoninverse={true}
                         buttonOnClick={this.reset}/>
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
                        <h3>YOUR PRICE</h3>
                        <div className='get-a-quote-price'>
                            <p className='get-a-quote-price-currency'>£</p>
                            <p className='get-a-quote-price-value'>{this.state.quote}</p>
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
                                getNewBatch={this.getNewBatch} /> 
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
