import React, { PureComponent } from 'react';
import './InputField.scss';

const InputField = (props) => {

    let output = null;
    let style = {};
    const text_input = <>
                          <label>{props.label}</label>
                          <input type="text" style={style} />
                       </>;

    switch(props.type) {
        case 'text': 
            output = text_input;
            style = {borderColor: props.color}
            break;
        case 'select':
            let options = props.options;
            let options_list = options.map((option) => (
                <option key={option}>{option}</option>
            ));
            const select_input = <>
                                    <label>{props.label}</label>
                                    <select>
                                        <option style={{color: 'lightgrey'}}>Select {props.label}</option>
                                        {options_list}
                                    </select>
                                 </>
            output = select_input;
            break;
        case 'radio': 
            options = props.options;
            options_list = options.map((option, i) => (
                <div className='radio-container' key={i}>
                    <input type='radio' id={option} name={props.label} value={option} />
                    <label htmlFor={option} className='radio'>{option}</label>
                </div>
            ))
            const radio_input = <>
                                    <label className='radio-label'>Do you want us to manage your payroll?</label>
                                    <div className='radio-list-container'> 
                                        {options_list}
                                    </div>
                                </>
            output = radio_input;
            break;
        default:
            break;
    }

    return (
        <div className='input-field-container'>
            {output}
        </div>
    )
}

export default InputField;