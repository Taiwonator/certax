import React, { Component } from 'react';
import './ContentBox.scss';
import Staircase from '../Staircase/Staircase.js';
import Content from '../Content/Content.js';
import ScrollDownButton from '../ScrollDownButton/ScrollDownButton';


function ContentBox(props) {
    return (
        <div style={{backgroundColor: props.darkMode()}} className='content-box-container'>
            <div style={{borderColor: props.colors.yellow, borderRight: 'none'}} className='content-box-left-half' />
            <div style={{borderColor: props.colors.blue, borderLeft: 'none'}} className='content-box-right-half' />
            <Staircase position='TR' color={props.colors.yellow} type='mini'/>
            <Staircase position='TL' color={props.colors.blue} type='mini'/> 
            <Staircase position='BR' color={props.colors.blue} type='mini'/>
            <Staircase position='BL' color={props.colors.yellow} type='mini'/>
            <Content headertext={props.content.headertext} 
                     paratext={props.content.paratext}
                     headercolor={props.colors.blue}
                     paracolor={props.colors.lightblue}
                     buttontext='More info'
                     buttoncolor={props.colors.yellow}
                     buttoninverse={true}
                     buttonOnClick={props.buttonOnClick}
                     align='center'/>
        </div>
    )
}

export default ContentBox;