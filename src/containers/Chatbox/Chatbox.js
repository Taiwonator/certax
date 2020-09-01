import React, { Component } from 'react';
import './Chatbox.scss';

class Chatbox extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = { 

        }
        this.data = [
            {
                name: 'Michael', 
                time: '4:00pm', 
                messages: ['Hello my name is Michael', 'Aiight sweet']
            }, 
            {
                name: 'Ben', 
                time: '6:00pm', 
                messages: ['Yo I am Ben', 'Nice to meet ya', 'I']
            }
        ]
    }



    render() { 
        return ( 
            <div className='chatbox-container'>
                <div className='chatbox-top-bar'>
                    <div className='chatbox-top-bar-text'>
                        <h3>{this.props.data.name}</h3>
                        <p>Typing...</p>
                    </div>
                    <ChatboxButton />
                </div>
                <div className='chatbox-body'>

                </div>
            </div> 
        );
    }
}

const ChatboxButton = () => (
    <svg className='chatbox-top-bar-button' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.05 14">
        <rect fill="white" x="832.25" y="212.85" width="17.5" height="2.3" transform="translate(-739 450.36) rotate(-45)"/>
        <rect fill="white" x="850.9" y="205.25" width="2.3" height="17.5" transform="translate(-735.76 458.17) rotate(-45)"/>
    </svg>
)

export default Chatbox;

