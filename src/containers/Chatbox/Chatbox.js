import React, { Component, useState, useEffect } from 'react';
import './Chatbox.scss';
import useWindowDimensions from '../../helperFunctions/useWindowDimensions.js';
import { returnDate, returnShortDate, dateHourDiff, returnTime, secondsFromNow } from '../../helperFunctions/dateOperations.js';

class Chatbox extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            active: false,
            chatOpen: false,
            sendable: false,
            displayDate: true,

            typing: false, 
            
            responder: {
                alias: 'Guest',
                type: 'visitor', 
                id: '404'
            },
            sender: {
                alias: 'Certax',
                type: 'client',
                id: '123'
            },
            message: '',
            focusedMessage: '', 
            messages: [
                
            ], 
            botMessages: [
                {messages: [
                    {message: 'Hello', date: new Date(), dateVisible: true}], sender: 'bot', seen: false, seenVisible: false}, 

            ],
            cachedMessages: [], 
            quoteID: "1111-2222-3333-4444", 

            messageStore: {
                "1111-2222-3333-4444": {
                    latestMessage: {
                        sender: "visitor", 
                        text: "This is a newest message", 
                        date: "Sat Sep 12 2020 22:02:07 GMT+0100 (GMT+01:00)",
                        id: 3, 
                        seen: false
                    }, 
                    messages: [
                        {
                            sender: "visitor",
                            text:"This is the oldest message",
                            date:"Sat Sep 12 2020 22:02:07 GMT+0100 (GMT+01:00)",
                            id: 0,
                            seen: true
                        },
                        {
                            sender: "client",
                            text:"This is an old message",
                            date:"Sat Sep 12 2020 22:02:07 GMT+0100 (GMT+01:00)",
                            id: 1,
                            seen: true
                        },
                        {
                            sender: "visitor", 
                            text: "This is a new message", 
                            date: "Sat Sep 12 2020 22:02:07 GMT+0100 (GMT+01:00)",
                            id: 2, 
                            seen: true
                        },
                        {
                            sender: "visitor", 
                            text: "This is a newest message", 
                            date: "Sat Sep 12 2020 22:02:07 GMT+0100 (GMT+01:00)",
                            id: 3, 
                            seen: false
                        }
                    ], 
                    typers: {}
                }, 
                "8888-7777-4444-5555":{
                    latestMessagae: {
                        sender: "visitor",
                        text: "This is the lastest message from Bob",
                        date: "Sat Sep 19 2020 12:24:06 GMT+0100 (GMT+01:00)",
                        id: 4,
                        seen: false,
                    },
                    messages: [
                      {
                        sender: "visitor",
                        text: "This is the lastest message from Bob",
                        date: "Sat Sep 19 2020 12:24:06 GMT+0100 (GMT+01:00)",
                        id:4,
                        seen: false
                      }
                    ],
                    typers: {}
                  }

            }, 
            conversationOverviews: [
                {
                    quoteID: "1111-2222-3333-4444", 
                    latestMessagae: {
                        sender: "visitor", 
                        text: "This is a newest message", 
                        date: "Sat Sep 12 2020 22:02:07 GMT+0100 (GMT+01:00)",
                        id: 3, 
                        seen: false
                    }, 
                    unseenCount: 2
                }, 
                {
                    quoteID: "8888-7777-4444-5555", 
                    latestMessagae: {
                        sender: "visitor",
                        text: "This is the lastest message from Bob",
                        date: "Sat Sep 19 2020 12:24:06 GMT+0100 (GMT+01:00)",
                        id: 4,
                        seen: false,
                    }, 
                    unseenCount: 10
                }
            ]
        }

        this.messageEndRef = React.createRef();
    }


    // ME user info (id, alias, type)
    
    // YOU user info (id, alias, type)
    // -- message info (userMessages, userBotMessages)

    // MESSAGE STORE
    // {
    //     [quoteID]: {
    //         latestMessage: {

    //         }, messages: {

    //         }, typers: {}
    //     },
    // }

    // DO
    // Convert messageStore into current chatlists and messages 

    // ASK SAM
    // Mention bot messages to Sam, and potential for ALIAS
    // Change TIME to DATE
    // Change SEENBY to SEEN and have it be TRUE or FALSE

    // CLIENT - Message store has all conversations {{},..{}} 
    // VISITOR - Message store has 1 conversation {{}} 

    componentDidMount() {

        // WEBSOCKET 
        // REQUEST CONVERSATION OVERVIEW (client)
        // REQUEST CONVERSATION (visitor) 





        // console.log(this.convertMessageStore(this.state.messageStore));

        // MESSAGES (of ID)
        const messages = this.getMessagesFromStore(this.state.messageStore, "1111-2222-3333-4444");

        // OVERVIEW OF ALL MESSAGES
        // [
        //     {
        //         quoteID: "1111-2222-3333-4444", 
        //         latestMessage: {
        //             sender, text, time, id, seen
        //         }
        //     }, 
        // ]


        //message has -> seen
                 //   -> sender
                 //   -> time
                 //   -> text
                 //   -> id
        
        // message on front end -> dateVisible
                             // -> seenVisible

        // messaegeBlock = sender messages
        // messageObj = seen time text id seenVisible dateVisible
    }

    getMessagesFromStore(store, quoteID) {
        console.log(quoteID);
        const storeMessages = (store[quoteID].messages);
        let messageBlocks = [];
        for(var i = 0; i < storeMessages.length; i++) {
            messageBlocks = this.addMessageToObject(messageBlocks, storeMessages[i]);
        }
        return messageBlocks;
    }

    addMessageToObject = (messageBlocks, message) => {
        let messageObj = {text: message.text, date: message.date, seen: message.seen, dateVisible: false, seenVisible: true};

        // DATEVISIBLE: Method to determine whether date needs to be shown (If it is longer than an hour from its previous message)
        // SEENVISIBLE: If it is the 'latest message'

        if(messageBlocks.length == 0) {
            // First message sent
            
            let messageBlock = {
                sender: message.sender, 
                messages: [messageObj]
            }

            messageBlocks.push(messageBlock);

        } else {
            // Set previous message setVisible to false
            messageBlocks[messageBlocks.length - 1].messages[messageBlocks[messageBlocks.length - 1].messages.length - 1].seenVisible = false;
            const lastMessageBlock = messageBlocks[messageBlocks.length - 1];
            if(lastMessageBlock.sender == message.sender) {
                // Same sender who sent previous messages
                message
                messageBlocks[messageBlocks.length - 1].messages.push(messageObj);


            } else {
                // Different sender of message

                let messageBlock = {
                    sender: message.sender, 
                    messages: [messageObj]
                }
                messageBlocks.push(messageBlock);

            }
        }

        return messageBlocks;

       
    } 

    closeChat = () => {
        const chatOpen = this.state.chatOpen;
        this.setState({
            chatOpen: false, message: ''
        })
    }

    scrollToBottom = () => {
        this.messageEndRef.current.scrollIntoView({behavior: 'smooth'});
    }

    openChatbox = () => {
        // WEBSOCKET 
        // REQUEST CONVERSATION OVERVIEW

        this.setState({
            active: true
        }, () => this.seeAllMessages())
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
            this.seeAllMessages();
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
            // WEB SOCKET
            // SEND NOT TYPING EVENT 

            this.setState({
                typing: false
            })
        } else if(this.state.message != '' && !this.state.typing) {
            // WEB SOCKET
            // SEND TYPING EVENT 

            this.setState({
                typing: true
            })
        }
    }

    sendMessage = () => {
        if(this.state.sendable) {

            // (ASYNC) WEB SOCKET - SEND NEW MESSAGE EVENT
            // RECIEVE NEW CONVERSATIONS 
            // CONVERT INTO MESSAGES

            const messages = [...this.state.messages];
            let newMessages = this.addMessageToObject(messages, {text: this.state.message, date: new Date(), seen: false, sender: this.state.sender.type})

            this.setState((prevState) => ({
                message: '', messages: newMessages
            }), () => {
                this.checkIfTyping();
                this.checkIfSendable();
                this.scrollToBottom();
                this.seeAllMessages();
            })
        } 
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          this.sendMessage();
        }
    }

    switchSender = () => {
        if(this.state.sender.type != 'client') {
            this.setState((prevState) => ({
                sender: {
                    alias: 'Certax', 
                    type: 'client', 
                    id: '123'
                }, 
                responder: {
                    alias: this.state.quoteID, 
                    type: 'visitor', 
                    id: '404'
                }
            }))
        } else {
            this.setState((prevState) =>({
                responder: {
                    alias: 'Certax', 
                    type: 'client', 
                    id: '123'
                }, 
                sender: {
                    alias: this.state.quoteID, 
                    type: 'visitor', 
                    id: '404'
                }
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
            const responder = {alias: this.state.quoteID, type: 'visitor', id: '404'};
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

    messageOnClick = (m) => {
        const oldFocusedMessage = this.state.focusedMessage;
        let focusedMessage;
        if(oldFocusedMessage != m) {
            focusedMessage = m;
        } else {
            focusedMessage = '';
        }
        this.setState({
            focusedMessage
        })
    }

    displayDateChecker = () => {
        const now = new Date();
        if(this.state.messages.length != 0) {
            let lastMessageBlock = this.state.messages[this.state.messages.length - 1];
            let lastMessage = lastMessageBlock.messages[lastMessageBlock.messages.length - 1];
            let lastMessageDate = lastMessage.date;
            // console.log(dateHourDiff(lastMessageDate, now))
            if(dateHourDiff(lastMessageDate, now) > 1) {
                // this.setState({
                //     displayDate: true
                // }) 
                return true;
            }
        } else {
            console.log("Messages list is empty")
            // this.setState({
            //     displayDate: true
            // });
            return true;
        }
    }

    seeAllMessages = () => {
        // WEB SOCKET
        // SEEN BY

        let messages = this.state.messages;
        for(var i = 0; i < messages.length; i++) {
            if(messages[i].sender == this.state.responder.type) {
                for(var j = 0; j < messages[i].messages.length; j++) {
                    messages[i].messages[j].seen = true;
                }
            }
        }
        this.setState({
            messages
        })
    }

    openChat = (quoteID) => {
        const messages = this.getMessagesFromStore(this.state.messageStore, quoteID);
        this.setState({
            chatOpen: true, 
            messages,
            responder: {
                alias: quoteID, 
                type: 'visitor', 
                id: '404'
            }, 
        }, () => { this.messageEndRef.current.scrollIntoView(); this.seeAllMessages() })

    }

    render() { 

        var chatOpen = this.state.chatOpen;

        return ( 
            <>
            <OpenChatBoxButton color={this.props.colors.blue} onClick={this.openChatbox} active={this.state.active}/>
            <div className={`${this.state.active && 'show'} chatbox-container`}>

                <div className='chatbox-top-bar' style={{backgroundColor: (!this.state.chatOpen) ? '#FAFAFA' : (this.state.responder.type == 'bot') ? this.props.colors.yellow : this.props.colors.blue}}>

                { (chatOpen) ? <MessageHeader responder={this.state.responder}
                                              typing={this.state.typing}
                                              colors={this.props.colors}
                                              switchSender={this.switchSender}
                                              toggleBotChat={this.toggleBotChat}
                                              closeChatbox={this.closeChatbox} 
                                              closeChat={this.closeChat}
                                              seeAllMessages={this.seeAllMessages}/> : 

                               <ChatsHeader colors={this.props.colors}
                                            closeChatbox={this.closeChatbox}/> }

                
                </div>


                <div className='chatbox-body'>

                    { (chatOpen) ? <MessageController messages={this.state.messages} 
                                       colors={this.props.colors} 
                                       senderType={this.state.sender.type}
                                       focusedMessage={this.state.focusedMessage} 
                                       ref={this.messageEndRef} 
                                       messageOnClick={this.messageOnClick}/> : 

                                    <ChatsController conversationOverviews={this.state.conversationOverviews} 
                                                     colors={this.props.colors}
                                                     openChat={this.openChat} />}
                    
                    
               
                </div>


                <div className='chatbox-input-container'>

                    { (chatOpen) ? <MessageInput messageValue={this.state.message} 
                                      sendable={this.state.sendable}
                                      colors={this.props.colors}
                                      sendMessage={this.sendMessage}
                                      handleMessageChange={this.handleMessageChange}
                                      handleKeyDown={this.handleKeyDown} /> : 
                                      
                                    <ChatsFooter colors={this.props.colors}/>}
                    
                    

                </div>


            </div> 
            </>
        );
    }
}

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

const MessageHeader = (props) => {
    return (
            <>    
                <div className='chatbox-top-bar-left'>
                    <CloseChat closeChat={props.closeChat}/> 
                    {/* Change back to closeChat */}
                    <div className='chatbox-top-bar-text' onClick={props.switchSender}>
                        <h3>{props.responder.alias}</h3>
                        <Status typing={props.typing}/>
                    </div>
                </div>
                <div className='chatbox-top-bar-right'>
                    <SwitchChatButton responderType={props.responder.type} onClick={props.toggleBotChat} colors={props.colors}/>
                    <CloseChatboxButton color={'white'} onClick={props.closeChatbox}/>
                </div>
            </>

    )
}

const CloseChat = (props) => {
    return (
        <svg className='chatbox-top-bar-button' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 25.05" onClick={props.closeChat}>
            <rect fill="white" x="11.38" y="3.78" width="1.5" height="17.5" transform="translate(-10.71 18.05) rotate(-45)"/>
            <rect fill="white" x="3.77" y="0.33" width="17.5" height="1.5" transform="translate(-2.9 14.81) rotate(-45)"/>
        </svg>
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

const SwitchChatButton = (props) => {
    const icon = (props.responderType != 'bot') ? <BotIcon onClick={props.onClick}/> : <WhiteC onClick={props.onClick}/>
    return (<div className={`chatbox-avatar chatbox-top-bar-button`} style={{height: '50px', backgroundColor: (props.responderType != 'bot' ? props.colors.yellow : props.colors.blue)}}>
                {icon}
            </div>
    )
}

const CloseChatboxButton = (props) => (
    <svg className='chatbox-top-bar-button' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64.47 58.31" onClick={props.onClick}>
        <rect fill={props.color} className="cross" x="966.31" y="450.9" width="3.44" height="79.13" transform="translate(-1002.11 366.88) rotate(-45)" />
        <rect fill={props.color} className="cross" x="928.46" y="488.74" width="79.13" height="3.44" transform="translate(-1002.11 366.88) rotate(-45)" />
    </svg>
)

const MessageController = React.forwardRef((props, ref) => {
    const message_blocks = props.messages;
    let list = message_blocks.map((block, i) => (
        <MessageBlock key={`block_${new Date().getTime()}_${i}`} 
                      blockSender={block.sender} 
                      senderType={props.senderType} 
                      messages={block.messages} 
                      colors={props.colors} 
                      messageOnClick={props.messageOnClick}
                      focusedMessage={props.focusedMessage} />
    ))
    return (
        <>
            {list}
            <div ref={ref} />
        </>
    )
})

const MessageBlock = (props) => {
    let avatar;
    if(props.blockSender != props.senderType) {
        if(props.blockSender == 'bot') {
            avatar = <div className='chatbox-avatar' style={{backgroundColor: props.colors.yellow}}><BotIcon /></div>
        } else if (props.blockSender == 'client') {
            avatar = <div className='chatbox-avatar' style={{backgroundColor: props.colors.blue}}><WhiteC /></div>
        } else if (props.blockSender == 'visitor') {
            avatar = <div className='chatbox-avatar' style={{backgroundColor: props.colors.blue}}><PersonIcon /></div>
        }
        console.log(props.blockSender);
    }

    const messages = props.messages;
    let list = messages.map((message, i) => {
        const key = `message_${new Date().getTime()}_${i}`;
        const textAlign = (props.senderType == props.blockSender) ? 'right' : 'left';
        let showDate = false, showSeen = false, focusedMessage = false;
        if(props.focusedMessage == message) {
            showDate = true, focusedMessage = true;
            if(message.seen) {
                showSeen = true;
            }
        } 

        if(message.dateVisible) {
            showDate = true;
        }

        if(message.seen && message.seenVisible) {
            showSeen = true;
        }

        return (
            <div key={key} className='chatbox-message'>
                <Timestamp date={message.date} visible={showDate}/>
                <p onClick={() => props.messageOnClick(message)} style={{filter: (focusedMessage) ? 'brightness(.8)' : ''}} >{message.text}</p>
                <SeenLabel textAlign={textAlign} visible={showSeen}/>
            </div>

        )
    })

    return (
                <div className={`chatbox-messages-container ${props.senderType == props.blockSender ? 'sender' : 'responder'}`}>
                    { avatar }
                    <div className='chatbox-messages'>
                        {list}
                    </div>
                </div>
    )
}

const Timestamp = (props) => {
    let time = returnDate(props.date);
    return (
        <h4 className={`chatbox-timestamp ${(props.visible == true) ? '' : 'collapse'}`}>{time}</h4>
    )
}

const SeenLabel = (props) => {
    const textAlign = props.textAlign;
    return (
        <h5 className={`seen ${(props.visible == true) ? '' : 'collapse'}`} style={{textAlign}}>Seen</h5>
    )

}

const MessageInput = (props) => {
    return (
        <>
            <input className='chatbox-input' type='text' placeholder='Type your message...' value={props.messageValue} onChange={props.handleMessageChange} onKeyDown={props.handleKeyDown}/>
            <SendButton color={(props.sendable) ? props.colors.blue : props.colors.grey} onClick={props.sendMessage }/>
        </>
    )
}

const SendButton = (props) => {
    return (
        <svg className='send-button' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.41 27.46" onClick={props.onClick}>
            <path fill={props.color} d="M859.53,213.37l-26.39-12.23a1.5,1.5,0,0,0-2,1.88l4.25,11.71-4.26,11.71a1.5,1.5,0,0,0,.88,1.93,1.53,1.53,0,0,0,1.17-.05l26.39-12.22a1.5,1.5,0,0,0,0-2.73Z" transform="translate(-831 -201)" />
        </svg>
    )
}











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

const MessageIcon = (props) => (
    <svg className='chatbox-avatar-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 475.04 332.17">
        <path fill={props.colors.yellow} d="M1163,572.4h3.13v14.14c0,20.33-17.07,36.81-38.14,36.81H872.24l-.09,1.07a174.57,174.57,0,0,0,.79,37.23v.05c0,.22.07.44.09.67a.06.06,0,0,1,0,.06,7.85,7.85,0,0,1-5.81,8.19,8.32,8.32,0,0,1-8.8-2.66l-.61-.85-30.91-43.76H790.32c-21.07,0-38.15-16.48-38.15-36.81V445.87c0-20.33,17.08-36.82,38.15-36.82h2.89V516.28c0,30.94,26.09,56.12,58.14,56.12h236.48q-.13,6.95-.88,13.66l-.19,4-.31,5.43a27.52,27.52,0,0,0,20,23.36,29,29,0,0,0,8.12,1.15h0a28.71,28.71,0,0,0,22.19-10.45l.33-.42.93-1.28Z" transform="translate(-752.17 -338.79)"/>
        <path fill={props.colors.blue} d="M1227.21,375.61V516.28c0,20.33-17.08,36.81-38.15,36.81h-36.59l-30.91,43.76-.61.85a8.35,8.35,0,0,1-8.8,2.67,7.86,7.86,0,0,1-5.81-8.2.06.06,0,0,1,0-.06c0-.23.05-.45.09-.67v-.05a174.49,174.49,0,0,0,.79-37.22l-.09-1.08H851.35c-21.07,0-38.14-16.48-38.14-36.81V375.61c0-20.33,17.07-36.82,38.14-36.82h337.71C1210.13,338.79,1227.21,355.28,1227.21,375.61Z" transform="translate(-752.17 -338.79)"/>
    </svg>
)



const ChatsHeader = (props) => {
    const style = {
        display: 'flex',
        flexDirection: 'row', 
        alignItems: 'center' 
    }
    return (
    <>    
        <div className='chatbox-top-bar-text' style={style}>
            <div className={`chatbox-avatar`} style={{background: 'none'}}><MessageIcon colors={props.colors}/></div>
            <h3 style={{color: props.colors.textblack}}>Chats</h3>
        </div>
        <CloseChatboxButton color={props.colors.blue} onClick={props.closeChatbox}/>

    </>
    )
}

const ChatsController = (props) => {

    const conversationOverviews = props.conversationOverviews;
    let overviews = conversationOverviews.map(overview => (
            <ChatListItem key={overview.latestMessagae.date}
                          alias={overview.quoteID}
                          quoteID={overview.quoteID}
                          latestMessage={overview.latestMessagae}
                          colors={props.colors}
                          openChat={props.openChat}
                          unseenCount={overview.unseenCount}/>
    ))

    // Order list (NEED TO DO)
    let orderedList = [];
    let list = [...overviews];
    const listLength = list.length;

    for(var j = 0; j < listLength; j++) { 
        let leastSeconds, mostRecentMessage;
        leastSeconds = secondsFromNow(list[0].props.latestMessage.date);
        mostRecentMessage = list[0];

        for(var i = 1; i < list.length; i++) {
            if(secondsFromNow(list[i].props.latestMessage.date) < leastSeconds && !orderedList.includes(list[i])) {
                leastSeconds = secondsFromNow(list[i].props.latestMessage.date);
                mostRecentMessage = list[i];
            } 
        }

        orderedList.push(mostRecentMessage);
        list = list.filter(x => x != mostRecentMessage);
    }

    return (
        <>{orderedList}</>
    )
}

const ChatListItem = (props) => {
    let unseenMessageCount = 0;

    if(props.latestMessage.sender == 'client') {
        unseenMessageCount = 0;
    } else if (props.latestMessage.sender == 'visitor'){
        unseenMessageCount = props.unseenCount;
    } else {
        console.log("A BOT LAST MESSAGED?");
    }

    let unseenMessagesLabel = (unseenMessageCount == 0) ? '' : <p style={{backgroundColor: props.colors.blue}}>{unseenMessageCount}</p>;

    return (
        <div className='chat-list-item-container' onClick={() => props.openChat(props.quoteID)}>
            <div className='chatbox-avatar' style={{backgroundColor: props.colors.blue}}><PersonIcon /></div>
            <div className='chat-list-item-content'>
                <div className='chat-list-item-top-row'>
                    <h3>{props.alias}</h3>
                    <p>{returnShortDate(new Date(props.latestMessage.date))}</p>
                </div>
                <div className='chat-list-item-bottom-row'>
                    <TrimmedText text={props.latestMessage.text} seen={props.latestMessage.seen} sender={props.latestMessage.sender} colors={props.colors}/>
                    <div className='chat-list-item-messages-counters'>
                        {unseenMessagesLabel}
                        {/* <p style={{backgroundColor: props.colors.yellow}}>2</p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

const TrimmedText = (props) => {
    let out;
    const charLimit = 25;
    let style = {};
    // Shortening
    if(props.text.length > charLimit) {
        if(props.sender != 'client') {
            out = `${props.text.substring(0, charLimit - 1)}...`;
        } else {
            out = `You: ${props.text.substring(0, charLimit - 5)}...`;
        }
    } else {
        if(props.sender != 'client') {
            out = props.text;
        } else {
            out = `You: ${props.text}`;
        }
    }

    if(props.seen || props.sender == 'client') {
        style = {
            color: '#9E9E9E', 
            fontWeight: 100
        }
    } else {
        style = {
            color: props.colors.blue, 
            fontWeight: 500
        }
    }

    return (
        <p style={style}>{out}</p>
    )
}

const ChatsFooter = (props) => {
    return (
        <div className={`chatbox-avatar center-top`} style={{backgroundColor: props.colors.blue}}><WhiteC /></div>
    )
}

export default Chatbox;

// Disable scroll when chatbox open