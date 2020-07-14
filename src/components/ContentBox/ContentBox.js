import React, { Component } from 'react';
import './ContentBox.scss';
import Staircase from '../Staircase/Staircase.js';
import Content from '../Content/Content.js';


function ContentBox(props) {
    return (
        <div className='content-box-container'>
            <Staircase position='TR' color={props.colors.yellow} type='mini'/>
            <Staircase position='TL' color={props.colors.blue} type='mini'/> 
            <Staircase position='BR' color={props.colors.blue} type='mini'/>
            <Staircase position='BL' color={props.colors.yellow} type='mini'/>
            <Content headertext={props.content.headertext} 
                     paratext={props.content.paratext}
                     headercolor={props.colors.blue}
                     paracolor={props.colors.lightblue}
                     align='center'/>
        </div>
    )
}

export default ContentBox;