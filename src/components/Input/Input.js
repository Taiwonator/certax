import React, { useState } from 'react';
import './Input.scss';

const Input = (props) => {
    const [value, setValue] = useState(0);
    const [locked, setLocked] = useState(false);

    let output = null;
    console.log(value);
    if(props.type == 'multi') {
        let style = (locked) ? {color: 'white', backgroundColor: props.color} : {color: props.color, backgroundColor: 'unset'}
        let input = <>
                        <select defaultValue={'DEFAULT'} onChange={e => setValue(e.target.value)} style={style} disabled={locked}>
                            <option value="DEFAULT" disabled>Select a number</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </>;
        output = input;

    } else if(props.type == 'binary') {
        let input = <div className='radio-wrapper'>
        <div className='radio-container'>
            <input type='radio' id={'no_key'} name={'yes-no'} value={'no'} onChange={e => setValue(e.target.value)} disabled={locked}/>
            <label htmlFor={'no_key'} className='radio'>NO</label>
        </div>
        <div className='radio-container'>
            <input type='radio' id={'yes_key'} name={'yes-no'} value={'yes'} onChange={e => setValue(e.target.value)} disabled={locked}/>
            <label htmlFor={'yes_key'} className='radio'>YES</label>
        </div>
        </div>
        output = input;

    } else if (props.type == 'number') {

        let input = <div className='number-input-container'>
                        <div className="number-input-decrement" onClick={() => (value > 1 && !locked) ? setValue(parseInt(value) - 1) : ''}>–</div>
                        <input className="number-input" type="text" placeholder={1} value={value} min={0} max={1000000} onChange={e => setValue(e.target.value)} disabled={locked}/>
                        <div className="number-input-increment" onClick={() => (!locked) ? setValue(parseInt(value) + 1) : ''}>+</div>
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