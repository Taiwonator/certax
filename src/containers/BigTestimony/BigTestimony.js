import React, { Component } from 'react';
import './BigTestimony.scss';
import Quote from '../../components/Quote/Quote';

function BigTestimony (props) {
    let style = {}
    const order = props.child % 2;

    if(order == 0) {
        style = {
            backgroundColor: props.colors.yellow,
            authorColor: props.colors.textblack
        }
    } else {
        style = {
            backgroundColor: props.colors.blue,
            authorColor: props.colors.yellow
        }
    }

    return (
        <div className='big-testimony-container'>
            <div className='big-testimony-content-container' style={{backgroundColor: style.backgroundColor, order}}>
                <Quote authorColor={style.authorColor} text={props.testimony.text} author={props.testimony.author} child={props.child}/>
            </div>
            <div className='big-testimony-image' style={{backgroundImage: `url(${props.testimony.image})`}}/>
        </div>
    )
}

export default BigTestimony;