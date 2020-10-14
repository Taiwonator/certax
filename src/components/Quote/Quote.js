import React, { Component } from 'react';
import './Quote.scss';

function Quote (props) {
    let text_style = {}
    let quote_style = {}
    if(props.child % 2 == 0) {
        text_style = {
            alignSelf: 'flex-start', 
            textAlign: 'left', 
        }
        quote_style = {
            alignSelf: 'flex-end', 
            textAlign: 'right', 
            color: props.authorColor
        }
    } else {
        text_style = {
            alignSelf: 'flex-end', 
            textAlign: 'right', 
        }
        quote_style = {
            alignSelf: 'flex-start', 
            textAlign: 'left', 
            color: props.authorColor
        }
    }
    return (
        <div className='quote-container'>
            <p className='quote-text' style={text_style}>{props.text}</p>
            <h4 className={`quote-author ${(quote_style.textAlign == 'left') ? 'hide-left' : 'hide-right'}`} style={quote_style}><span>{props.author}</span></h4>
            <h5 className={`quote-author ${(quote_style.textAlign == 'left') ? 'hide-left' : 'hide-right'}`} style={quote_style}><span>{props.company}</span></h5>
        </div>
    )
}

export default Quote;