import React, { Component } from 'react';
import './InfoSection.scss';
import ContentSplit from '../../components/ContentSplit/ContentSplit';
import useWindowDimensions from '../../helperFunctions/useWindowDimensions.js';
import Staircase from '../../components/Staircase/Staircase';

function InfoSection(props) {
    const { width } = useWindowDimensions();
    let content_align = 'left';
    if(width <= 600 & content_align != 'center') {
        content_align = 'center';
    } else if(width > 600 & content_align != 'left') {
        content_align = 'left';
    }

    return (
        <div className='info-section-container'>
            <div className='info-section-content-wrapper'>
                <LeftGraphic colors={props.colors}/>
                <ContentSplit colors={props.colors} content={props.data} alignContent={content_align}/>
            </div>
            <MiddleGraphic colors={props.colors}/>
        </div>
    )
}



const LeftGraphic = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 233.5 660.5" className='left-side-graphic'>
    <g>
        <g>
            <rect x="76" width="74" height="76" fill={props.colors.yellow} opacity='.8' isolation='isolate'/>
            <rect y="76" width="76" height="74" fill={props.colors.yellow} opacity='1' isolation='isolate'/>
            <rect width="76" height="76" fill={props.colors.yellow} opacity='.6' isolation='isolate'/>
        </g>
    </g>
    <g>
        <g>
            <rect x="148" y="146" width="72" height="74" fill={props.colors.blue}/>
            <rect x="148" y="75" width="72" height="71" fill={props.colors.blue} opacity='.8' isolation='isolate'/>
            <rect x="75" y="146" width="73" height="74" fill={props.colors.blue} opacity='.8' isolation='isolate'/>
            <rect x="75" y="75" width="73" height="71" fill={props.colors.blue} opacity='.6' isolation='isolate'/>
        </g>
    </g>
    <line x1="42.5" y1="120.5" x2="42.5" y2="627.5" stroke={props.colors.yellow}/>
    <line x1="42.5" y1="627.5" x2="220.5" y2="627.5" stroke={props.colors.yellow}/>
    <line x1="220.5" y1="591.5" x2="220.5" y2="660.5" stroke={props.colors.yellow}/>
    <line x1="233.5" y1="613.5" x2="233.5" y2="638.5" stroke={props.colors.yellow}/>
</svg>
)

const MiddleGraphic = (props) => (
    <div className='middle-graphic-container'>
        <svg viewBox="0 0 132.5 407.5">
            <g isolation='isolate'>
                <g>
                    <rect fill='grey' x="32.5" y="0" width="100" height="100" />
                    <rect fill={props.colors.blue} x="82.5" y="50" width="50" height="50" />
                    <rect fill={props.colors.blue} x="82.5" width="50" height="50" opacity='.8' />
                    <rect fill={props.colors.blue} x="32.5" width="50" height="50" opacity='.6'/>
                    <g>
                        <rect stroke={props.colors.yellow} fill='none' x="49.5" y="374" width="33" height="33" />
                    </g>
                    <rect fill={props.colors.yellow} x="15" y="17.5" width="100" height="100"/>
                    <line stroke={props.colors.yellow} fill='none' x1="65.5" y1="373.5" x2="65.5" y2="117.5" />
                    <rect fill={props.colors.yellow} x="65" y="67.5" width="50" height="50" />
                    <rect fill={props.colors.lightyellow} x="65" y="17.5" width="50" height="50" />
                    <rect fill={props.colors.lightyellow} x="15" y="67.5" width="50" height="50" />
                    <rect fill={props.colors.lighteryellow} x="15" y="17.5" width="50" height="50" />
                </g>
            </g>
        </svg>
    </div>
)

export default InfoSection;