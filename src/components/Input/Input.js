import React, { useState } from 'react';
import './Input.scss';

const Input = (props) => {
    let locked = true;
    let output = null;

    if(props.type == 'selection') {
        let style = (locked) ? {color: 'white', backgroundColor: props.color} : {color: props.color, backgroundColor: 'unset'}
        let input = <>
                        <select defaultValue={'DEFAULT'} onChange={e => props.updateAnswer(props.answerKey, e.target.value)} style={style}>
                            <option value="DEFAULT" disabled>Select a number</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </>;
        output = input;

    } else if(props.type == 'boolean') {
        let input = <div className='radio-wrapper'>
        <div className='radio-container'>
            <input type='radio' id={`no_${props.answerKey}`} name={`yes-no_${props.question}`} value={false} onChange={e => props.updateAnswer(props.answerKey, false)}/>
            <label htmlFor={`no_${props.answerKey}`} className='radio'>NO</label>
        </div>
        <div className='radio-container'>
            <input type='radio' id={`yes_${props.answerKey}`} name={`yes-no_${props.question}`} value={true} onChange={e => props.updateAnswer(props.answerKey, true)}/>
            <label htmlFor={`yes_${props.answerKey}`} className='radio'>YES</label>
        </div>
        </div>
        output = input;

    } else if (props.type == 'number') {

        let input = <div className='number-input-container'>
                        <div className="number-input-decrement" onClick={e => props.updateAnswer(props.answerKey, parseInt(props.answer) - 1)}>–</div>
                        <input className="number-input" type="text" placeholder={0} value={props.answer} min={0} max={10000000000} onChange={e => props.updateAnswer(props.answerKey, parseInt(e.target.value))}/>
                        <div className="number-input-increment" onClick={e => props.updateAnswer(props.answerKey, parseInt(props.answer) + 1)}>+</div>
                    </div>
        output = input;

    } else {
        let input = <input placeholder='not valid' />
        output = input;
    }

    return ( 
        <>
            {output}
        </>
     );
}
 
export default Input;