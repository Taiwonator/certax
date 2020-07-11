import React, { Component } from 'react';
import './BackgroundPanels.scss';

const BackgroundPanels = () => (
  <div className="background-panels-container">
        <div className={`background-panel panel-4`}></div>
        <div className={`background-panel panel-3`}></div>
        <div className={`background-panel panel-2`}></div>
        <div className={`background-panel panel-1`}></div>
        <div className={`background-panel panel-1 hide`}></div>
        <div className={`background-panel panel-2`}></div>
        <div className={`background-panel panel-3`}></div>
        <div className={`background-panel panel-4`}></div>
  </div>  
);

export default BackgroundPanels;