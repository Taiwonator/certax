import React, { Component, useState, useEffect } from 'react';
import './Chatbox.scss';
import useWindowDimensions from '../../helperFunctions/useWindowDimensions.js';

class Chatbox extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            active: false, 
            typing: false, 
            message: '', 
            sender: 'admin', 
            messages: [
                    {
                        sender: 'admin', 
                        messages: ['Hello', 'My name is Michael']
                    }, 
                    // {
                    //     sender: 'user', 
                    //     messages: ['Hi', 'Lorem ipsum dolor sit amet']
                    // }
            ]
        }
    }

// {
//     sender: '', 
//     time: '', 
//     messages: ['', '']
// }

    componentDidMount() {

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

    handleMessageChange = (e) => {
        this.setState({
            message: e.target.value
        }, () => this.checkIfTyping())
    }

    checkIfTyping = () => {
        if(this.state.message == '') {
            this.setState({
                typing: false
            })
        } else if(this.state.message != '' && !this.state.typing) {
            this.setState({
                typing: true
            })
        }
    }

    sendMessage = () => {
        console.log("Message sent", this.state.message.length);
        this.addMessage();
        this.setState((prevState) => ({
            message: '', 
        }), () => this.checkIfTyping())
        
    }

    addMessage = () => {
        const lastMessage = this.state.messages[this.state.messages.length - 1];
        if(lastMessage.sender == this.state.sender) {
            let messages = [...this.state.messages];
            let lastMessage = messages[this.state.messages.length - 1];
            lastMessage.messages.push(this.state.message);
            messages[this.state.messages.length - 1] = lastMessage;
            
            this.setState((prevState) => ({
                messages
            }))
        } else {
            this.setState((prevState) => ({
                messages: [...prevState.messages, {
                    sender: this.state.sender, 
                    messages: [this.state.message]
                }]
            }))
        }
    }

    checkMessage = (message) => {
        const x = message.length / 20
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          this.sendMessage();
        }
    }

    switchSender = () => {
        if(this.state.sender == 'user') {
            this.setState({
                sender: 'admin'
            })
        } else {
            this.setState({
                sender: 'user'
            })
        }
    }

    render() { 
        return ( 
            <>
            <OpenChatBoxButton color={this.props.data.colors.blue} onClick={this.openChatbox} active={this.state.active}/>
            <div className={`${this.state.active && 'show'} chatbox-container`}>
                <div className='chatbox-top-bar' style={{backgroundColor: this.props.data.colors.blue}} onClick={this.switchSender}>
                    <div className='chatbox-top-bar-text'>
                        <h3>{this.props.data.name}</h3>
                        <Status typing={this.state.typing}/>
                    </div>
                    <CloseChatboxButton onClick={this.closeChatbox}/>
                </div>
                <div className='chatbox-body'>
                    {/* <MessageBlock sender={'admin'} color={this.props.data.colors.blue}/>
                    <MessageBlock sender={'user'} color={this.props.data.colors.blue}/> */}
                    <MessageController messages={this.state.messages} />
                    
                </div>
                <div className='chatbox-input-container'>
                    <input className='chatbox-input' type='text' placeholder='Type your message...' value={this.state.message} onChange={this.handleMessageChange} onKeyDown={this.handleKeyDown}/>
                    <SendButton color={this.props.data.colors.blue} onClick={this.sendMessage}/>
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

const OpenChatBoxButton = (props) => {
    const width = useWindowDimensions().width;
    if(width < 600) {
        if(props.active) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    return (
        <svg onClick={props.onClick} className={`${(props.active && 'hidden')} chatbox-open-button`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.24 48">
        <circle fill={props.color} cx="28.24" cy="24" r="24"/>
        <path fill={props.color} d="M830.41,220.42s-22.65,2.35-22.65,22.65c0,0,12.1-11.32,22.65-8.39S830.41,220.42,830.41,220.42Z" transform="translate(-807.76 -199)"/>
    </svg>
    )
}

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
        <svg className='send-button' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.41 27.46" onClick={props.onClick}>
            <path fill={props.color} d="M859.53,213.37l-26.39-12.23a1.5,1.5,0,0,0-2,1.88l4.25,11.71-4.26,11.71a1.5,1.5,0,0,0,.88,1.93,1.53,1.53,0,0,0,1.17-.05l26.39-12.22a1.5,1.5,0,0,0,0-2.73Z" transform="translate(-831 -201)" />
        </svg>
    )
}

const MessageBlock = (props) => {
    //props.person = admin | bot | user
    const avatar = (props.sender == 'bot' || props.sender == 'admin') && <div className='chatbox-avatar' style={{backgroundColor: props.color}}></div>;
    const messages = props.messages;
    let list = messages.map((message) => (
        <p key={message}>{message}</p>
    ))
    return (
                <div className={`chatbox-messages-container ${props.sender == 'user' ? 'user' : ''}`}>
                    { avatar }
                    <div className='chatbox-messages'>
                        {list}
                    </div>
                </div>
    )
}

const MessageController = (props) => {
    const message_blocks = props.messages;
    let list = message_blocks.map((block) => (
        <MessageBlock key={`block_${block.messages[0]}`} sender={block.sender} messages={block.messages}/>
    ))
    return (
        <>
            {list}
        </>
    )
}


export default Chatbox;

// Disable scroll when chatbox open