import React, { PureComponent } from 'react';
import './InputField.scss';

const InputField = (props) => {

    let output = null;
    let style = {};
    const text_input = <input type="text" style={style} />;

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
            const select_input = <select>
                                     <option style={{color: 'lightgrey'}}>Select {props.label}</option>
                                     {options_list}
                                 </select>
            output = select_input;
        default:
            break;
    }

    return (
        <div className='input-field-container'>
            <label>{props.label}</label>
            {output}
            
        </div>
    )
}

export default InputField;