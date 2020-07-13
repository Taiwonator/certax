import React, { Component } from 'react';
import './Staircase.scss';

const Staircase = (props) => {
    let className = props.position;

    const box_10s = <rect className="box-10" x="1060" y="681" width="117" height="117" transform="translate(1645 1149) rotate(-180)" fill={props.color}/>;
    const box_8s =  <g>
                        <rect className="box-8" x="1060" y="564" width="117" height="117" transform="translate(1645 915) rotate(-180)" fill={props.color} />
                        <rect className="box-8" x="943" y="681" width="117" height="117" transform="translate(1411 1149) rotate(-180)" fill={props.color} />
                    </g>;
    const box_6s = <g>
                        <rect className="box-6" x="1060" y="447" width="117" height="117" transform="translate(1645 681) rotate(-180)" fill={props.color} />
                        <rect className="box-6" x="826" y="681" width="117" height="117" transform="translate(1177 1149) rotate(-180)" fill={props.color} />
                        <rect className="box-6" x="943" y="564" width="117" height="117" transform="translate(1411 915) rotate(-180)" fill={props.color} />
                    </g>;
    const box_4s = <g>
                        <rect className="box-4" x="1060" y="330" width="117" height="117" transform="translate(1645 447) rotate(-180)" fill={props.color} />
                        <rect className="box-4" x="943" y="447" width="117" height="117" transform="translate(1411 681) rotate(-180)" fill={props.color} />
                        <rect className="box-4" x="826" y="564" width="117" height="117" transform="translate(1177 915) rotate(-180)" fill={props.color} />
                        <rect className="box-4" x="709" y="681" width="117" height="117" transform="translate(943 1149) rotate(-180)" fill={props.color} />
                    </g>;
    const box_2s = <rect className="box-2" x="592" y="681" width="117" height="117" transform="translate(709 1149) rotate(-180)" fill={props.color} />




    return (
    <div className={`staircase-container ${className}`}> 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 585 468">
            {box_10s}
            {box_8s}
            {box_6s}
            {box_4s}
            {box_2s}            
        </svg>
    </div>
)};

export default Staircase;