import React, { Component } from 'react';
import Content from '../Content/Content.js';
import SVGCalculator from '../SVGCalculator/SVGCalculator';

import './ContentSplit.scss';

function ContentSplit(props) {
    return (
        <div className='info-section-content'>
            <Content headertext={props.content.headertext} 
                        paratext={props.content.paratext}
                        headercolor={props.colors.yellow}
                        paracolor={props.colors.grey}
                        align={props.alignContent}/>
            <SVGCalculator colors={props.colors}/>
        </div>
    )
} 

export default ContentSplit;