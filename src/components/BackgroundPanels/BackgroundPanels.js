import React, { Component } from 'react';
import './BackgroundPanels.scss';

const BackgroundPanels = (props) => (
  <div className="background-panels-container">
        <div style={{backgroundColor: props.darkMode()}} className={`background-panel panel-4`}></div>
        <div style={{backgroundColor: props.darkMode()}} className={`background-panel panel-3`}></div>
        <div style={{backgroundColor: props.darkMode()}} className={`background-panel panel-2`}></div>
        <div style={{backgroundColor: props.darkMode()}} className={`background-panel panel-1`}></div>
        <div style={{backgroundColor: props.darkMode()}} className={`background-panel panel-1 hide`}></div>
        <div style={{backgroundColor: props.darkMode()}} className={`background-panel panel-2`}></div>
        <div style={{backgroundColor: props.darkMode()}} className={`background-panel panel-3`}></div>
        <div style={{backgroundColor: props.darkMode()}} className={`background-panel panel-4`}></div>
  </div>  
);

export default BackgroundPanels;