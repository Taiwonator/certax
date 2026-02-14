import React, { Component } from 'react';
import './Staircase.scss';

const Staircase = (props) => {
    let className = props.position;

    const box_10 = <rect key={1} className="box-10" x="1060" y="681" width="117" height="117" transform="translate(1645 1149) rotate(-180)" fill={props.color} />;
    const box_8s = <g key={2}>
        <rect className="box-8" x="1060" y="564" width="117" height="117" transform="translate(1645 915) rotate(-180)" fill={props.color} />
        <rect className="box-8" x="943" y="681" width="117" height="117" transform="translate(1411 1149) rotate(-180)" fill={props.color} />
    </g>;
    const box_8s_hollow = <g key={3}>
        <rect className="box-8" x="1060" y="564" width="117" height="117" transform="translate(1645 915) rotate(-180)" stroke={props.color} strokeWidth="2" fill='none' />
        <rect className="box-8" x="943" y="681" width="117" height="117" transform="translate(1411 1149) rotate(-180)" stroke={props.color} strokeWidth="2" fill='none' />
    </g>;
    const box_6s = <g key={4}>
        <rect className="box-6" x="1060" y="447" width="117" height="117" transform="translate(1645 681) rotate(-180)" fill={props.color} />
        <rect className="box-6" x="826" y="681" width="117" height="117" transform="translate(1177 1149) rotate(-180)" fill={props.color} />
        <rect className="box-6" x="943" y="564" width="117" height="117" transform="translate(1411 915) rotate(-180)" fill={props.color} />
    </g>;
    const box_6 = <rect key={5} className="box-6" x="943" y="564" width="117" height="117" transform="translate(1411 915) rotate(-180)" fill={props.color} />;
    const box_4s = <g key={6}>
        <rect className="box-4" x="1060" y="330" width="117" height="117" transform="translate(1645 447) rotate(-180)" fill={props.color} />
        <rect className="box-4" x="943" y="447" width="117" height="117" transform="translate(1411 681) rotate(-180)" fill={props.color} />
        <rect className="box-4" x="826" y="564" width="117" height="117" transform="translate(1177 915) rotate(-180)" fill={props.color} />
        <rect className="box-4" x="709" y="681" width="117" height="117" transform="translate(943 1149) rotate(-180)" fill={props.color} />
    </g>;
    const box_2 = <rect key={7} className="box-2" x="592" y="681" width="117" height="117" transform="translate(709 1149) rotate(-180)" fill={props.color} />

    const full = [box_10, box_8s, box_6s, box_4s, box_2];
    const partial = [box_10, box_8s, box_6s];
    const block = [box_10, box_8s, box_6];
    const mini = [box_10, box_8s_hollow];

    let output = 'full';
    switch (props.type) {
        case 'full':
            output = full;
            break;
        case 'partial':
            output = partial;
            break;
        case 'block':
            output = block;
            break;
        case 'mini':
            output = mini;
            break;
        case 'single':
            output = <rect key={8} className="box-8" x="1060" y="681" width="117" height="117" transform="translate(1645 1149) rotate(-180)" stroke={props.color} strokeWidth="2" fill='none' />;
    }

    return (
        <div className={`staircase-container ${className}`}>
            <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 585 468">
                {output}
            </svg>
        </div>
    )
};

export default Staircase;