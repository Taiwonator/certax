import React, { Component, useState, useEffect } from 'react';
import './Chatbox.scss';

class Chatbox extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            active: true, 
            typing: false
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
                        <Status typing={this.state.typing}/>
                    </div>
                    <CloseChatboxButton onClick={this.closeChatbox}/>
                </div>
                <div className='chatbox-body'>
                    <MessageBlock image={this.props.data.logo}/>
                </div>
                <div className='chatbox-input-container'>
                    <input className='chatbox-input' type='text' placeholder='Type your message...' />
                    <SendButton color={this.props.data.colors.blue} />
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

const Status = (props) => {
    const [index, setIndex] = useState(0);
    const word = ['Typing', 'Typing.', 'Typing..', 'Typing...'];
    let text = (props.typing) ? word[index] : 'Active';
    useEffect(() => {
        const timer = setTimeout(() => {
            setIndex(index + 1);
            if(index > 2) {
                setIndex(0);
            } 
        }, 250);
        return () => clearTimeout(timer);
      });
    return <p>{text}</p>
}

const SendButton = (props) => {
    return (
        <svg className='send-button' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.41 27.46">
            <path fill={props.color} d="M859.53,213.37l-26.39-12.23a1.5,1.5,0,0,0-2,1.88l4.25,11.71-4.26,11.71a1.5,1.5,0,0,0,.88,1.93,1.53,1.53,0,0,0,1.17-.05l26.39-12.22a1.5,1.5,0,0,0,0-2.73Z" transform="translate(-831 -201)" />
        </svg>
    )
}

const MessageBlock = (props) => {
    //props.person = admin | bot | user
    console.log(props.image);
    return (
                <div className='chatbox-messages-container'>
                    <div className='chatbox-avatar'>
                        <img src={props.image} />
                    </div>
                    <div className='chatbox-messages'>
                        <p>Hello my name is</p>
                        <p>Nice to meet you</p>
                    </div>
                </div>
    )
}


export default Chatbox;

