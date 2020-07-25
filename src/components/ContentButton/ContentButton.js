import React, { useState } from 'react';
import './ContentButton.scss';

const ContentButton = (props) => {

    let style = {};
    //Use for onhover change
    const [text, changeText] = useState(props.text);

    if(!props.inverse) {
        style = {
            color: props.color,
            borderColor: props.color
        }
        
    } else {
        style = {
            color: 'white', 
            borderColor: 'none', 
            backgroundColor: props.color
        }
    }
        
        return (
            <div onMouseEnter={() => {if(props.buttonOnHover) changeText(props.buttonOnHoverText)}}
                 onMouseLeave={() => {if(props.buttonOnHover) changeText(props.text)}}
                 onClick={props.buttonOnClick} className={`button ${(!props.inverse) ? '' : 'inverse'} `} 
                 style={style} type='button'>
                    {text}
                 </div>
        )
}

export default ContentButton;