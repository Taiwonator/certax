import React, { Component } from 'react';
import './GetAQuote.scss';
import Content from '../../components/Content/Content';
import QuotationQuestions from '../QuotationQuestions/QuotationQuestions';
import {getBatch} from '../../mocking/Batch';

class GetAQuote extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           questions: [[{key:'isSelfAssessment', displayValue: "Do you only require your income tax return to be submitted?", type: "boolean"}]],
           answers: {},
           batch: 0
        }
    }

    getNewBatch = (answers, batch) => {
        console.log("Helo");
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
                         align={'left'}/>
                </div>
                <div className='get-a-quote-card-image-container'>
                    <div className='get-a-quote-card-image'/>
                    <div className='get-a-quote-price-container'>
                        <h3>YOUR PRICE</h3>
                        <div className='get-a-quote-price'>
                            <p className='get-a-quote-price-currency'>£</p>
                            <p className='get-a-quote-price-value'>{this.props.data.quote}</p>
                            <p className='get-a-quote-price-per'>/mon</p>
                        </div>
                    </div>
                </div>
            </div>

            <QuotationQuestions questions={this.state.questions} colors={this.props.colors} getNewBatch={this.getNewBatch}/>
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