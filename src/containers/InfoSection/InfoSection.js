import React, { Component } from 'react';
import './InfoSection.scss';
import ContentSplit from '../../components/ContentSplit/ContentSplit';

function InfoSection(props) {
    return (
        <div className='info-section-container'>
            <div className='info-section-content-wrapper'>
                <div className='left-side-graphic' />
                <ContentSplit colors={props.colors} content={props.data}/>
                <div className='empty-space' />
            </div>
        </div>
    )
}

export default InfoSection;