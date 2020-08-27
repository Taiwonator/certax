import React, { useState } from 'react';
import './Input.scss';

const Input = (props) => {
    let locked = false;
    let output = null;

    if(props.type == 'selection') {
        let style = (props.locked) ? {color: 'white', backgroundColor: props.color} : {color: props.color, backgroundColor: 'unset'}
        //options selections
        let optionsList = Object.keys(props.selections).map((key, i) => <option key={key} value={key}>{Object.values(props.selections)[i]}</option>);
        let input = <>
                        <select defaultValue={'DEFAULT'} onChange={e => props.updateAnswer(props.answerKey, e.target.value)} style={style} disabled={props.locked}>
                            <option value="DEFAULT" disabled>Select an option</option>
                            {/* <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option> */}
                            {optionsList}
                        </select>
                    </>;
        output = input;

    } else if(props.type == 'boolean') {
        let input = <div className='radio-wrapper'>
        <div className='radio-container'>
            <input type='radio' id={`no_${props.answerKey}`} name={`yes-no_${props.question}`} value={false} onChange={e => props.updateAnswer(props.answerKey, false)} disabled={props.locked}/>
            <label htmlFor={`no_${props.answerKey}`} className='radio'>NO</label>
        </div>
        <div className='radio-container'>
            <input type='radio' id={`yes_${props.answerKey}`} name={`yes-no_${props.question}`} value={true} onChange={e => props.updateAnswer(props.answerKey, true)} disabled={props.locked}/>
            <label htmlFor={`yes_${props.answerKey}`} className='radio'>YES</label>
        </div>
        </div>
        output = input;

    } else if (props.type == 'number') {
        let style = (props.locked) ? {backgroundColor: props.color, color: 'white'} : {backgroundColor: 'white', color: props.color};
        let input = <div className='number-input-container'>
                        <div className="number-input-decrement" onClick={e => {if(!props.locked)props.updateAnswer(props.answerKey, parseInt(props.answer) - 1)}}>–</div>
                        <input className="number-input" style={style} type="text" placeholder={0} value={props.answer} min={0} max={10000000000} onChange={e => props.updateAnswer(props.answerKey, parseInt(e.target.value))} disabled={props.locked}/>
                        <div className="number-input-increment" onClick={e => {if(!props.locked)props.updateAnswer(props.answerKey, parseInt(props.answer) + 1)}}>+</div>
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