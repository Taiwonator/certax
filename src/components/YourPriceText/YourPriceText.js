import React, { Component } from 'react';
import './YourPriceText.scss';

const YourPriceText = (props) => {
    return ( 
        <div style={{color: props.color}} className='your-price-text-container'>
            <h4>Your price:</h4>
            <div className='your-price-text'>
                <p className='your-price-text-symbol'>£</p>
                <h3 className='your-price-text-value'>{props.value}</h3>
                <p className='your-price-text-rate'>/mon</p>
            </div>
        </div>
     );
}
 
export default YourPriceText;