import React, { Component } from 'react';
import './Text.scss';

const Text = (props) => {
    if(props.text != undefined) {
        let items = props.text.map((obj, i) => {
            if(obj.type == 'para') {
                return <Para key={i} text={obj.text} highlightedWord={obj.highlightedWord} color={props.color} textAlign={props.textAlign}/>
            } else if (obj.type == 'bulletpoints') {
                return <BulletPoints key={i} points={obj.points} color={props.color}/>
            } else {
                return null;
            }
        })
        items = items.filter(x => x != undefined);
        return ( <>{items}</> );
    } else {
        return ''
    }
}

const Para = (props) => {
    let out = '';
    if(props.text.includes(props.highlightedWord)) {
        const index = props.text.indexOf(props.highlightedWord);
        const before = props.text.substring(0, index);
        const after = props.text.substring(index + props.highlightedWord.length, props.text.length);
        out = <p style={{color: props.color, textAlign: props.textAlign}}>{before}<span className='bold'>{props.highlightedWord}</span>{after}</p>
    } else {
        out = <p style={{color: props.color, textAlign: props.textAlign}}>{props.text}</p>;
    }
    return (
        <>{out}</>
    )
}

const BulletPoints = (props) => {
    const points = props.points.map((point, i) => 
        <li key={i}>
            <Para text={point.text} highlightedWord={point.highlightedWord} color={props.color}/>
        </li>    
    );
    return(
        <ul>
            {points}
        </ul>
    )
}



 
export default Text;