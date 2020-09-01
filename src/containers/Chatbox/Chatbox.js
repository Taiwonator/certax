import React, { Component } from 'react';
import './Chatbox.scss';

class Chatbox extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = { 
            active: false, 
            
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

    openChatbox = () => {
        this.setState({
            active: true
        })
    }

    closeChatbox = () => {
        this.setState({
            active: false
        })
    }

    render() { 
        return ( 
            <>
            <OpenChatBoxButton color={this.props.data.colors.blue} onClick={this.openChatbox} active={this.state.active}/>
            <div className={`${this.state.active && 'show'} chatbox-container`}>
                <div className='chatbox-top-bar' style={{backgroundColor: this.props.data.colors.blue}}>
                    <div className='chatbox-top-bar-text'>
                        <h3>{this.props.data.name}</h3>
                        <p>Typing...</p>
                    </div>
                    <CloseChatboxButton onClick={this.closeChatbox}/>
                </div>
                <div className='chatbox-body'>

                </div>
                <div className='chatbox-input-container'>
                    
                </div>
            </div> 
            </>
        );
    }
}

const CloseChatboxButton = (props) => (
    <svg className='chatbox-top-bar-button' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64.47 58.31" onClick={props.onClick}>
        <rect fill='white' className="cross" x="966.31" y="450.9" width="3.44" height="79.13" transform="translate(-1002.11 366.88) rotate(-45)" />
        <rect fill='white' className="cross" x="928.46" y="488.74" width="79.13" height="3.44" transform="translate(-1002.11 366.88) rotate(-45)" />
    </svg>
)

const OpenChatBoxButton = (props) => (
    <svg onClick={props.onClick} className={`${(props.active && 'hidden')} chatbox-open-button`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.24 48">
	<circle fill={props.color} cx="28.24" cy="24" r="24"/>
	<path fill={props.color} d="M830.41,220.42s-22.65,2.35-22.65,22.65c0,0,12.1-11.32,22.65-8.39S830.41,220.42,830.41,220.42Z" transform="translate(-807.76 -199)"/>
</svg>
) 


export default Chatbox;

