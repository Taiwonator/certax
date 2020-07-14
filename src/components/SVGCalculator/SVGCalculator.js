import React, { Component } from 'react';
import './SVGCalculator.scss';

const SVGCalculator = (props) => {
    return (
        <div className='SVGCalculator-container'>
            <svg id="SVGCalculator" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 391.69 391.73">
                <rect id="Rectangle_61-4" data-name="Rectangle 61-4" x="202.57" y="189.16" width="167.8" height="167.8" fill={props.colors.blue} opacity='.8' isolation='isolate'/>
                <rect id="Rectangle_100" data-name="Rectangle 100" x="270.71" y="273.06" width="35.86" height="0.94" fill='white'/>
                <rect id="Rectangle_101" data-name="Rectangle 101" x="287.7" y="255.13" width="0.94" height="35.86"  fill='white'/>
                <rect id="Rectangle_61-3" data-name="Rectangle 61-3" x="202.57" y="21.36" width="167.8" height="167.8" fill={props.colors.blue}/>
                <rect id="Rectangle_98" data-name="Rectangle 98" x="269.77" y="100.45" width="35.86" height="0.94"  fill='white'/>
                <rect id="Rectangle_61" data-name="Rectangle 61" x="34.77" y="21.36" width="167.8" height="167.8" fill={props.colors.blue} opacity='.8' isolation='isolate'/>
                <rect id="Rectangle_97" data-name="Rectangle 97" x="117.86" y="82.85" width="0.94" height="35.86" transform="translate(-36.6 113.19) rotate(-45)"  fill='white'/>
                <rect id="Rectangle_99" data-name="Rectangle 99" x="100.4" y="99.64" width="35.86" height="0.94" transform="translate(-36.13 113) rotate(-45)"  fill='white'/>
                <rect id="Rectangle_61-5" data-name="Rectangle 61-5" y="154.39" width="237.34" height="237.34" fill={props.colors.yellow}/>
                <g id="Group_64" data-name="Group 64">
                    <rect id="Rectangle_102" data-name="Rectangle 102" x="95.08" y="263.34" width="46.5" height="1.48" fill='white'/>
                    <rect id="Rectangle_103" data-name="Rectangle 103" x="95.08" y="284.18" width="46.5" height="1.48" fill='white'/>
                </g>
                <path d="M13.87,140.26V.5H391.19V377.82H252.47" fill='none' stroke={props.colors.yellow} strokeMiterlimit='10'/>
            </svg>
        </div>
    )
}

export default SVGCalculator;