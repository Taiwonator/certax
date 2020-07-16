import React, { Component } from 'react';
import './GetAQuote.scss';
import YourPriceText from '../../components/YourPriceText/YourPriceText';

class GetAQuote extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        console.log(this.props.content.image);
    }
    render() { 
        return ( 
            <div className='get-a-quote-container'>
                <div style={{borderColor: this.props.colors.textblack}} className='get-a-quote-content-container'>

                </div>
                <div className='get-a-quote-image-container'>
                    <div style={{backgroundImage: `url(${this.props.content.image})`}} className='get-a-quote-image-darkner'/>
                    <YourPriceText color={this.props.colors.white} value={59}/>
                </div>
            </div>
         );
    }
}
 
export default GetAQuote;