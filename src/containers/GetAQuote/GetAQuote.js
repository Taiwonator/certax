import React, { Component } from 'react';
import './GetAQuote.scss';
import YourPriceText from '../../components/YourPriceText/YourPriceText';
import InputField from '../../components/InputField/InputField';

class GetAQuote extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        console.log(this.props.content.image);
    }
    render() { 
        return ( 
            <div className='get-a-quote-container'>
                <div style={{backgroundColor: this.props.colors.white, borderColor: this.props.colors.textblack}} className='get-a-quote-content-container'>
                    <Block color={this.props.colors.textblack}/>
                    <form className='get-a-quote-content'>
                        <InputField key={`InputField_0`} label='Company Name' color={this.props.colors.textblack} type='text'/>

                        <InputField key={`InputField_1`} 
                                    label='Your Turnover' 
                                    color={this.props.colors.textblack} 
                                    type='select' 
                                    options={['£0 to £20,000', '£20,000 to £85,000', '£85,000 to £201,000', '£201,000 to £300,000']}/>

                        <InputField key={`InputField_2`} 
                                    label='Do you want us to manage your payroll?' 
                                    color={this.props.colors.textblack} 
                                    type='radio' options={['Weekly','Fourtnightly', 'Monthly']}/>

                    </form>
                </div>
                <div className='get-a-quote-image-container'>
                    <div style={{backgroundImage: `url(${this.props.content.image})`}} className='get-a-quote-image-darkner'/>
                    <YourPriceText color={this.props.colors.white} value={59}/>
                </div>
            </div>
         );
    }
}

const Block = (props) => (
    <svg className='get-a-quote-graphic' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 585 468" preserveAspectRatio="xMidYMid meet">
        <rect fill={props.color} y="351" width="117" height="117" />
        <rect fill={props.color} opacity='.8' y="234" width="117" height="117" />
        <rect fill={props.color} opacity='.6' x="117" y="234" width="117" height="117" />
        <rect fill={props.color} opacity='.8' x="117" y="351" width="117" height="117" />
    </svg>
)
 
export default GetAQuote;