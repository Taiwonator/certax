import React, { Component } from 'react';
import './ContentBox.scss';
import Staircase from '../Staircase/Staircase.js';


function ContentBox(props) {
    return (
        <div className='content-box-container'>
            <Staircase position='TR' color={props.colors.yellow} type='mini'/>
            <Staircase position='TL' color={props.colors.blue} type='mini'/> 
            <Staircase position='BR' color={props.colors.yellow} type='mini'/>
            <Staircase position='BL' color={props.colors.blue} type='mini'/>
        </div>
    )
}

export default ContentBox;