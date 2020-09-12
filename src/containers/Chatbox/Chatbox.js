import React, { Component, useState, useEffect } from 'react';
import './Chatbox.scss';
import useWindowDimensions from '../../helperFunctions/useWindowDimensions.js';
import { returnDate, dateHourDiff } from '../../helperFunctions/dateOperations.js';

class Chatbox extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            active: false, 
            typing: false, 
            sendable: false,
            displayDate: true,

            sender: {
                alias: 'Guest',
                type: 'guest'
            },
            responder: {
                alias: 'Certax',
                type: 'admin',
            },

            message: '', 
            messages: [
                
            ], 
            botMessages: [
                {messages: [
                    {message: 'Hello', date: new Date(), dateVisible: true}], writerType: 'bot'}, 

            ],
            cachedMessages: []
        }

        this.messageEndRef = React.createRef();
    }

    componentDidMount() {

    }

    scrollToBottom = () => {
        this.messageEndRef.current.scrollIntoView({behavior: 'smooth'});
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
        }, () => {
            this.checkIfTyping();
            this.checkIfSendable();
        })
    }

    checkIfSendable = () => {
        if(this.state.message == '') {
            this.setState({
                sendable: false
            })
        } else {
            this.setState({
                sendable: true
            })
        }
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
        if(this.state.sendable) {
            this.addMessage();
            this.setState((prevState) => ({
                message: ''
            }), () => {
                this.checkIfTyping();
                this.checkIfSendable();
                this.scrollToBottom();
            })
        } 
    }

    addMessage = () => {
        let messageObj = {message: this.state.message, date: new Date(), dateVisible: false};
        this.returnTimeSinceLastmessage();
        if(this.state.displayDate == true) {
            messageObj.dateVisible = true;
            this.setState({
                displayDate: false 
            }) 
        }
        if(this.state.messages.length != 0) {
            // Same person who sent the last message talking
            const lastMessage = this.state.messages[this.state.messages.length - 1];
            if(lastMessage.writerType == this.state.sender.type) {
                let messages = [...this.state.messages];
                let lastMessage = messages[this.state.messages.length - 1];
                lastMessage.messages.push(messageObj);
                messages[this.state.messages.length - 1] = lastMessage;
                
                this.setState((prevState) => ({
                    messages
                }))
            } else {
                // Means it is the other individual talking
                this.setState((prevState) => ({
                    messages: [...prevState.messages, {
                        writerType: this.state.sender.type, 
                        messages: [messageObj]
                    }]
                }))
            }
        } else {
            // First message sent
            this.setState((prevState) => ({
                messages: [{
                    writerType: this.state.sender.type, 
                    messages: [messageObj]
                }]
            }))
        }
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          this.sendMessage();
        }
    }

    switchSender = () => {
        if(this.state.sender.type == 'guest') {
            const sender = {senderAlias: 'Certax', type: 'admin'}
            const responder = this.returnResponder(sender);
            this.setState((prevState) => ({
                sender, responder
            }))
        } else {
            const sender = {senderAlias: 'Guest', type: 'guest'}
            const responder = this.returnResponder(sender);
            this.setState((prevState) => ({
                 sender, responder
            }))
        }
    }

    toggleBotChat = () => {
        if(this.state.responder.type != 'bot') {
            const messages = this.state.messages;
            const botMessages = this.state.botMessages;
            this.setState({
                responder: {
                    alias: 'Certax Bot', 
                    type: 'bot'
                }, 
                cachedMessages: messages, 
                messages: botMessages
            })
        } else {
            const responder = this.returnResponder(this.state.sender);
            const messages = this.state.cachedMessages;
            const botMessages = this.state.messages;
            this.setState({
                responder, 
                messages, 
                botMessages, 
                cachedMessages: []
            })
        }
    }

    returnResponder = (sender) => {
        if(sender.type == 'admin') {
            return {alias: 'Guest', type: 'guest'}
        } else if (sender.type == 'guest'){
            return {alias: 'Certax', type: 'admin'}
        } else {
            return ''
        }
    }

    toggleDateVisbility = (m) => {
        const messages = this.state.messages;
        let new_messages = messages.map(function(messages) {
            let block_messages = messages.messages;
            for(var i = 0; i < block_messages.length; i++) {
                if(block_messages[i] == m) {
                    block_messages[i].dateVisible = !block_messages[i].dateVisible;
                    return block_messages;
                }
            }
        })
        this.setState((prevState) => ({
            new_messages
        }))
        
    }

    returnTimeSinceLastmessage = () => {
        const now = new Date();
        if(this.state.messages.length != 0) {
            let lastMessageBlock = this.state.messages[this.state.messages.length - 1];
            let lastMessage = lastMessageBlock.messages[lastMessageBlock.messages.length - 1];
            let lastMessageDate = lastMessage.date;
            console.log(dateHourDiff(lastMessageDate, now))
            if(dateHourDiff(lastMessageDate, now) > 1) {
                this.setState({
                    displayDate: true
                }) 
            }
        } else {
            console.log("Messages list is empty");
        }
    }

    render() { 
        return ( 
            <>
            <OpenChatBoxButton color={this.props.colors.blue} onClick={this.openChatbox} active={this.state.active}/>
            <div className={`${this.state.active && 'show'} chatbox-container`}>
                <div className='chatbox-top-bar' style={{backgroundColor: (this.state.responder.type == 'bot') ? this.props.colors.yellow : this.props.colors.blue}}>
                    <div className='chatbox-top-bar-text' onClick={this.switchSender}>
                        <h3>{this.state.responder.alias}</h3>
                        <Status typing={this.state.typing}/>
                    </div>
                    <div className='chatbox-top-bar-buttons'>
                        <SwitchChatButton responderType={this.state.responder.type} onClick={this.toggleBotChat} colors={this.props.colors}/>
                        <CloseChatboxButton onClick={this.closeChatbox}/>
                    </div>
                </div>
                <div className='chatbox-body'>
                    <MessageController messages={this.state.messages} colors={this.props.colors} senderType={this.state.sender.type} ref={this.messageEndRef} toggleDateVisbility={this.toggleDateVisbility}/>
                </div>
                <div className='chatbox-input-container'>
                    <input className='chatbox-input' type='text' placeholder='Type your message...' value={this.state.message} onChange={this.handleMessageChange} onKeyDown={this.handleKeyDown}/>
                    <SendButton color={(this.state.sendable) ? this.props.colors.blue : this.props.colors.grey} onClick={this.sendMessage}/>
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

const SwitchChatButton = (props) => {
    const icon = (props.responderType != 'bot') ? <BotIcon onClick={props.onClick}/> : <WhiteC onClick={props.onClick}/>
    return (<div className={`chatbox-avatar chatbox-top-bar-button`} style={{backgroundColor: (props.responderType != 'bot' ? props.colors.yellow : props.colors.blue)}}>
                {icon}
            </div>
    )
}

const Status = (props) => {
    const [index, setIndex] = useState(0);
    const word = ['Typing', 'Typing.', 'Typing..', 'Typing...'];
    let text = (props.typing) ? word[index] : "Active";
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

const Timestamp = (props) => {
    let time = returnDate(props.date);
    return (
        <h4 className={`chatbox-timestamp ${(props.visible == true) ? '' : 'collapse-timestamp'}`}>{time}</h4>
    )
}

const MessageBlock = (props) => {
    let avatar;
    if(props.blockWriterType != props.senderType) {
        if(props.blockWriterType == 'bot') {
            avatar = <div className='chatbox-avatar' style={{backgroundColor: props.colors.yellow}}><BotIcon /></div>
        } else if (props.blockWriterType == 'admin') {
            avatar = <div className='chatbox-avatar' style={{backgroundColor: props.colors.blue}}><WhiteC /></div>
        } else if (props.blockWriterType == 'guest') {
            avatar = <div className='chatbox-avatar' style={{backgroundColor: props.colors.blue}}><PersonIcon /></div>
        }
    }

    const messages = props.messages;
    let list = messages.map((message, i) => {
        const key = `message_${new Date().getTime()}_${i}`;
        return (
            <div key={key} className='chatbox-message'>
                <Timestamp date={message.date} visible={message.dateVisible}/>
                <p onClick={() => props.toggleDateVisbility(message)}>{message.message}</p>
            </div>
        )
    })

    return (
                <div className={`chatbox-messages-container ${props.senderType == props.blockWriterType ? 'sender' : 'responder'}`}>
                    { avatar }
                    <div className='chatbox-messages'>
                        {list}
                    </div>
                </div>
    )
}

// sender & responder

const MessageController = React.forwardRef((props, ref) => {
    const message_blocks = props.messages;
    let list = message_blocks.map((block, i) => (
        <MessageBlock key={`block_${new Date().getTime()}_${i}`} blockWriterType={block.writerType} senderType={props.senderType} messages={block.messages} colors={props.colors} toggleDateVisbility={props.toggleDateVisbility}/>
    ))
    return (
        <>
            {list}
            <div ref={ref} />
        </>
    )
})

const WhiteC = (props) => (
    <svg className={`chatbox-avatar-icon ${(props.onClick != undefined) ? 'clickable' : ''}`} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 204.13 226.05" onClick={props.onClick}>
        <path fill='white' d="M1073.65,351.91a94.52,94.52,0,0,1-13.55,88.61,99.7,99.7,0,0,0-150.69-114.4,94.61,94.61,0,0,1,164.24,25.79Z" transform="translate(-875.02 -289)" />
        <path fill='white' d="M945.26,513.56A94.51,94.51,0,0,1,875,457.87a99.7,99.7,0,0,0,174-74.18,94.6,94.6,0,0,1-103.8,129.87Z" transform="translate(-875.02 -289)" />
        <path fill='white' d="M970.52,341.59c12.87,0,22.36,3.56,28.46,9.65l4.57-8.13h6.27s-3.22,16.1-3.22,23.38v11.18h-7.11v-6.44c0-14.06-11-23.71-28.8-23.71-29.82,0-36.25,27.44-36.25,52.51,0,27.78,7.79,52.35,37.27,52.35,17.95,0,27.78-9.49,31.84-27.11l6.78,1c-3.39,15.92-12.54,32-40,32-33.71,0-51.16-24.06-51.16-58.79C919.19,364.46,937.32,341.59,970.52,341.59Z" transform="translate(-875.02 -289)" />
    </svg>
)

const BotIcon = (props) => (
    <svg className={`chatbox-avatar-icon ${(props.onClick != undefined) ? 'clickable' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.29 22.42" onClick={props.onClick}>
        <title>BotIcon</title>
        <path fill='white' d="M865.84,210h0Z" transform="translate(-833 -195)" />
        <path fill='white' d="M865.8,208.49a.34.34,0,0,1-.34.33.34.34,0,0,1-.33-.33h0a7.34,7.34,0,0,0-7.28-6.41h-14a7.34,7.34,0,0,0-7.28,6.41h0a.35.35,0,0,1-.34.33.33.33,0,0,1-.33-.33.22.22,0,0,1,0-.08,8,8,0,0,1,7.94-7h14a8,8,0,0,1,7.94,7A.22.22,0,0,1,865.8,208.49Z" transform="translate(-833 -195)" />
        <ellipse fill='white' cx="10" cy="14.43" rx="2" ry="3" />
        <ellipse fill='white' cx="27" cy="14.43" rx="2" ry="3" />
        <path fill='white' d="M850.84,200.12a2.56,2.56,0,1,1,2.56-2.56A2.56,2.56,0,0,1,850.84,200.12Zm0-4.46a1.9,1.9,0,1,0,1.89,1.9A1.89,1.89,0,0,0,850.84,195.66Z" transform="translate(-833 -195)" />
        <path fill='white' d="M834.45,205.9a6.85,6.85,0,0,0,0,6.38,2.33,2.33,0,0,0,1.44,1.2.33.33,0,0,1,.27.32h0a.34.34,0,0,1-.34.34h-.06a2.92,2.92,0,0,1-1.89-1.52,7.58,7.58,0,0,1,0-7.05,2.92,2.92,0,0,1,1.89-1.52.33.33,0,0,1,.39.26s0,0,0,.07h0a.33.33,0,0,1-.27.32A2.29,2.29,0,0,0,834.45,205.9Z" transform="translate(-833 -195)" />
        <path fill='white' d="M866.84,212.27a6.91,6.91,0,0,0,0-6.38,2.35,2.35,0,0,0-1.45-1.2.32.32,0,0,1-.26-.32h0a.32.32,0,0,1,.33-.34h.06a2.92,2.92,0,0,1,1.89,1.52,7.52,7.52,0,0,1,0,7.05,2.92,2.92,0,0,1-1.89,1.52.33.33,0,0,1-.39-.26v-.07h0a.32.32,0,0,1,.26-.32A2.33,2.33,0,0,0,866.84,212.27Z" transform="translate(-833 -195)" />
        <path fill='white' d="M835.89,208.41s0,.05,0,.08A.22.22,0,0,1,835.89,208.41Z" transform="translate(-833 -195)" />
        <path fill='white' d="M835.85,210.07V210A.21.21,0,0,0,835.85,210.07Z" transform="translate(-833 -195)" />
        <path fill='white' d="M865.8,208.49a.22.22,0,0,0,0-.08A.22.22,0,0,1,865.8,208.49Z" transform="translate(-833 -195)" />
        <path fill='white' d="M865.83,210h0v.08h0a8,8,0,0,1-8,7.35h-14a8,8,0,0,1-8-7.35h0V210h0a.34.34,0,0,1,.36-.31.35.35,0,0,1,.31.34h0a7.34,7.34,0,0,0,7.31,6.74h14a7.35,7.35,0,0,0,7.32-6.74h0a.34.34,0,0,1,.67,0Z" transform="translate(-833 -195)" />
        <path fill='white' d="M835.84,210h0Z" transform="translate(-833 -195)" />
        <path fill='white' d="M865.84,210s0,0,0,.06a.22.22,0,0,1,0-.08Z" transform="translate(-833 -195)" />
    </svg>
)

const PersonIcon = () => (
    <svg className='chatbox-avatar-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.9 49.65">
        <rect fill='none' stroke='white' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='4px' x="10.91" y="2" width="25.08" height="25.08" rx="12.54" />
        <path fill='none' stroke='white' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='4px' d="M29.39,73.67A23.16,23.16,0,0,1,50.84,59.09h0A23.16,23.16,0,0,1,72.29,73.67" transform="translate(-27.39 -26.02)" />
    </svg>
)


export default Chatbox;

// Disable scroll when chatbox open