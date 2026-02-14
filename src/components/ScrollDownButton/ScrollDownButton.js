import React from 'react';
import './ScrollDownButton.scss';

const ScrollDownButton = (props) => {
    return (
        <div onClick={props.scroll} className='scroll-down-button-container'>
            <svg id="scroll-down-button" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 126.1 63.05">
                <polygon fill={props.color} points="0 0 126.09 0 63.05 63.05 0 0" />
            </svg>
        </div>
    )
};

export default ScrollDownButton;