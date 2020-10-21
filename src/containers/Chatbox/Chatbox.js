import React, { Component, useState, useEffect } from 'react';
import './Chatbox.scss';
import useWindowDimensions from '../../helperFunctions/useWindowDimensions.js';
import { returnDate, returnShortDate, dateHourDiff, returnTime, secondsFromNow } from '../../helperFunctions/dateOperations.js';
import { newMessage, receiveClientID, receiveConversationOverviews, receiveConversation, seenBy, nowTyping, stoppedTyping, changeName, nowOnline, nowOffline } from '../../mocking/ChatboxEvents.js';
import Underline from '../../components/Underline/Underline';

let socket = null;

class Chatbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            booleans: {
                active: false, // Is chatbox open or closed
                chatOpen: false, // Is a conversation open
                chatReady: false,
                sendable: false, // *
                botChat: false, // *
                typing: false, // *
                nameChanged: true
            },
            chatInfo: {
                responder: { // *
                    name: '',
                    type: '', 
                    id: ''
                },
                sender: { // *
                    name: '',
                    type: '',
                    id: ''
                },
                message: '', // *
                focusedMessage: '', // * 
                messages: [], // *
                conversationID: ''
            },
            messageStore: {}, //* 
        }

        this.messageEndRef = React.createRef();
        this.chatTopRef = React.createRef();
    }

    // IF CLIENT 
    // IF VISITOR (Receive Conversation only)


    async componentDidMount() {
        socket = await new WebSocket("wss://wss.certaxnorwich.accountant/"); 
        window.chatSocket = socket;   
        socket.onopen = () => {
            console.log("Websocket open");
            this.launchChat();
        }
        socket.onmessage = async(message) => {
            const dataFromServer = JSON.parse(message.data);
            // console.log(dataFromServer);
            if(dataFromServer.type == "nowOnline") {
                // this.mergeNowOnline(dataFromServer);
            } else if (dataFromServer.type == "nowOffline") {
                // this.mergeNowOffline(dataFromServer);
            } else if (dataFromServer.type == "changeName") {
                this.mergeChangeName(dataFromServer);
            } else if (dataFromServer.type == "nowTyping") {
                this.mergeNowTyping(dataFromServer);
            } else if (dataFromServer.type == "stoppedTyping") {
                this.mergeStoppedTyping(dataFromServer);
            } else if (dataFromServer.type == "receiveConversationOverviews") {

                
                // NOW RECEIVED CONVERSATIONS OVERVIEW (Including the conversationID)
                this.mergeReceiveConversationOverviews(dataFromServer);     

                if(dataFromServer.conversationOverviews.length == 1) {
                    // User
                    this.setState((prevState) => ({
                        chatInfo: {
                            ...prevState.chatInfo,
                            conversationID: dataFromServer.conversationOverviews[0].conversationID
                        } 
                    }))

                    socket.send(JSON.stringify({
                        type: "requestConversation", 
                        conversationID: this.state.chatInfo.conversationID
                    }))       
                } else {
                    this.setState((prevState) => ({
                        booleans: {
                            ...prevState.booleans,
                            chatReady: true
                        } 
                    }))
                }


            } else if (dataFromServer.type == "receiveConversation") {
                this.mergeReceiveConversation(dataFromServer);
                this.openChat(dataFromServer.conversationID);

                if(this.state.chatInfo.sender.name == dataFromServer.conversationID) {
                    this.setState((prevState) => ({
                        booleans: {
                            ...prevState.booleans,
                            nameChanged: false
                        }
                    }), () => {
                        this.sendBotMessage("Hello, please type your name and press enter");
                    })
                } 

            } else if (dataFromServer.type == "newMessage") {
                this.mergeNewMessage(dataFromServer);
            } else if (dataFromServer.type == "seenMessage") {
                console.log("4")
                this.mergeSeenBy(dataFromServer);
            }
        }
    }

    componentWillUnmount() {
        socket.close();
    }

    launchChat = () => {  
        socket.send(JSON.stringify({
            type: "requestConversationOverviews"
        }))    
    }

    mergeNewMessage = (newMessage) => { // *
        if(Object.keys(this.state.messageStore).length == 0) {
            this.setState({
                messageStore: {
                    [newMessage.conversationID]: {
                        latestMessage: newMessage.message, 
                        messages: [newMessage.message]
                    }
                }
            }, () => {
                const messages = this.getMessagesFromStore(newMessage.conversationID);
                this.setState((prevState) => ({
                    chatInfo: {
                        ...prevState.chatInfo,
                        messages
                    }
                }), () => this.seeAllMessages())
            })
            
        } else {
            let messages = [];

            if(this.state.messageStore[newMessage.conversationID].messages != undefined) {
                messages = [...this.state.messageStore[newMessage.conversationID].messages];
            }

            messages.push(newMessage.message);
            this.setState((prevState) => ({
                messageStore: {
                    ...prevState.messageStore,
                    [newMessage.conversationID]: {
                        ...prevState.messageStore[newMessage.conversationID],
                        latestMessage: newMessage.message, 
                        messages
                    }
                }
            }), () => {
                const messages = this.getMessagesFromStore(newMessage.conversationID);
                this.setState((prevState) => ({
                    chatInfo: {
                        ...prevState.chatInfo,
                        messages
                    }
                }), () => this.seeAllMessages())
            })
        }
        this.scrollToBottom()
        return "newMessage merge complete"
    }

    mergeReceiveConversationOverviews = (conversationOverviews) => { // CLIENT
        const clientID = receiveClientID();
        for(var i = 0; i < conversationOverviews.conversationOverviews.length; i++) {
            let conversationOverview = conversationOverviews.conversationOverviews[i];
            const name = (conversationOverview.participants[conversationOverview.conversationID].name == '') ? conversationOverview.conversationID : conversationOverview.participants[conversationOverview.conversationID].name;
            this.setState((prevState) => ({
                messageStore: {
                    ...prevState.messageStore, 
                    [conversationOverview.conversationID]: {
                        ...prevState.messageStore[conversationOverview.conversationID],
                        participants: {
                            [conversationOverview.conversationID]: {
                                lastMessageSeenID: conversationOverview.participants[conversationOverview.conversationID].lastMessageSeenID, 
                                isTyping: false, 
                                isOnline: false, 
                                name: name
                            }, 
                            [clientID]: {
                                lastMessageSeenID: conversationOverview.participants[clientID].lastMessageSeenID,
                                isTyping: false,
                                isOnline: false,
                                name: conversationOverview.participants[clientID].name 
                            }
                        }, 
                        latestMessage: conversationOverview.latestMessage
                    }
                }
            }))
        }

        return "ConversationOverviews merge complete"
    } 

    mergeReceiveConversation = (conversation) => { // *
        this.setState((prevState) => ({
            messageStore: {
                ...prevState.messageStore, 
                [conversation.conversationID]: {
                    ...prevState.messageStore[conversation.conversationID], 
                    messages: conversation.messages
                }
            }
        }))

        return "Conversation merge complete"
    }

    getMessagesFromStore = (conversationID) => { // *
        if(this.state.messageStore[conversationID] != undefined) {
            const storeMessages = (this.state.messageStore[conversationID].messages);
            let messageBlocks = [];
            for(var i = 0; i < storeMessages.length; i++) {
                if(!this.state.booleans.botChat) {
                    messageBlocks = this.addMessageToObject(messageBlocks, storeMessages[i]);
                } else {
                    if(storeMessages[i].sender == 'bot') {
                        messageBlocks = this.addMessageToObject(messageBlocks, storeMessages[i]);
                    }
                }
            }
            return messageBlocks;
        } else {
            return null;
        }
    }

    addMessageToObject = (messageBlocks, message) => { //*
        let messageObj = {messageID: message.messageID, text: message.text, time: message.time, seen: false, timeVisible: false, seenVisible: true};
        // DATEVISIBLE: Method to determine whether date needs to be shown (If it is longer than an hour from its previous message)
        // SEENVISIBLE: If it is the 'latest message'
        
        // Set Seen (Should work)
        
        if(message.messageID <= this.state.messageStore[this.state.chatInfo.conversationID].participants[this.state.chatInfo.responder.id].lastMessageSeenID) {
            messageObj.seen = true;
            // console.log(`${this.state.sender.id} has seen message (${message.messageID})`);
        }

        //  CHECK TIME BETWEEN THIS MESSAGE AND PREVIOUS MESSAGE
        // Have time of last message in state. On load, set to latest message. If new message.time....timeVisible == true

        if(messageBlocks.length == 0) {
            // First message sent
            
            messageObj.timeVisible = true;
            
            let messageBlock = {
                sender: message.sender, 
                messages: [messageObj]
            }

            messageBlocks.push(messageBlock);

        } else {
            // Set previous message setVisible to false
            messageBlocks[messageBlocks.length - 1].messages[messageBlocks[messageBlocks.length - 1].messages.length - 1].seenVisible = false;
            const lastMessageBlock = messageBlocks[messageBlocks.length - 1];

            // Set previous message timeVisible to true
            const prevMessage = messageBlocks[messageBlocks.length - 1].messages[messageBlocks[messageBlocks.length - 1].messages.length - 1];
            if(dateHourDiff(prevMessage.time, messageObj.time) > 1) {
                messageObj.timeVisible = true;
            }

            if(lastMessageBlock.sender == message.sender) {
                // Same sender who sent previous messages

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

    mergeSeenBy = (seenBy) => { // *
        console.log(seenBy);
        let messageStore = {...this.state.messageStore};
        messageStore[seenBy.conversationID].participants[seenBy.participantID].lastMessageSeenID = seenBy.messageID;

        let messages = [...this.state.chatInfo.messages];
        for(var i = 0; i < messages.length; i++) {
            if(messages[i].sender == this.state.chatInfo.responder.id) {
                for(var j = 0; j < messages[i].messages.length; j++) {
                    messages[i].messages[j].seen = true;
                }
            }
        }

        this.setState((prevState) => ({
            chatInfo: {
                ...prevState.chatInfo,
                messageStore, messages
            }
        }))
        


        return "seenBy merge complete"
    }

    mergeNowTyping = (nowTyping) => { // *
        let messageStore = {...this.state.messageStore};
        messageStore[nowTyping.conversationID].participants[nowTyping.participantID].isTyping = true;
        this.setState({
            messageStore
        })
    }

    mergeStoppedTyping = (stoppedTyping) => { // *
        let messageStore = {...this.state.messageStore};
        messageStore[stoppedTyping.conversationID].participants[stoppedTyping.participantID].isTyping = false;
        this.setState({
            messageStore
        })
    }

    isTypingCheck = (conversationID, participantID) => {
        return this.state.messageStore[conversationID].participants[participantID].isTyping
    } 

    mergeChangeName = (changeName) => {
        let messageStore = {...this.state.messageStore};
        messageStore[changeName.conversationID].participants[changeName.participantID].name = changeName.name;
        this.setState({
            messageStore
        })
    }

    setNewName = () => {
        if(this.state.booleans.sendable) {
            socket.send(JSON.stringify({
                type: "changeName",
                conversationID: this.state.chatInfo.conversationID,
                participantID: this.state.chatInfo.sender.id,
                name: this.state.chatInfo.message
            }))
            socket.send(JSON.stringify({
                type: "newMessage", 
                conversationID: this.state.chatInfo.conversationID, 
                message: {
                    sender: this.state.chatInfo.sender.id, 
                    text: this.state.chatInfo.message, 
                    time: new Date()
                }
            }))
            socket.send(JSON.stringify({
                type: "newMessage", 
                conversationID: this.state.chatInfo.conversationID, 
                message: {
                    sender: 'bot', 
                    text: `Hello ${this.state.chatInfo.message}, it is nice to meet you :)`, 
                    time: new Date()
                }
            }))

            this.setState((prevState) => ({
                chatInfo: {
                    ...prevState.chatInfo,
                    message: '',
                    sender: {
                        ...prevState.chatInfo.sender, 
                        name: prevState.chatInfo.message
                    }
                },
                booleans: {
                    ...prevState.booleans, 
                    nameChanged: true
                },
            }), () => {
                // Stopped Typing
                this.checkIfTyping();
                this.checkIfSendable();
            })
        } 
    }

    mergeNowOnline = (nowOnline) => {
        let messageStore = {...this.state.messageStore};
        messageStore[nowOnline.conversationID].participants[nowOnline.participantID].isOnline = true;
        this.setState({
            messageStore
        })
    }

    mergeNowOffline = (nowOffline) => {
        let messageStore = {...this.state.messageStore};
        messageStore[nowOffline.conversationID].participants[nowOffline.participantID].isOnline = true;
        this.setState({
            messageStore
        })
    }


    closeChat = () => { // CLIENT
        this.setState((prevState) => ({
            booleans: {
                ...prevState.booleans,
                chatOpen: false,
            },
            chatInfo: {
                ...prevState.chatInfo,
                message: ''
            }
        }), () => this.scrollToTop()) 
    }
    
    scrollToBottom = () => { // *
        this.messageEndRef.current.scrollIntoView({behavior: 'smooth'});
    }

    scrollToTop = () => { // *
        this.chatTopRef.current.scrollIntoView();
    }

    openChatbox = () => { // *
        // WEBSOCKET 
        // REQUEST CONVERSATION OVERVIEW

        this.setState((prevState) => ({
            booleans: {
                ...prevState.booleans,
                active: true,
            } 
        })) 
        
    }

    closeChatbox = () => { // *
        this.setState((prevState) => ({
            booleans: {
                ...prevState.booleans,
                active: false,
            } 
        })) 
    }

    handleMessageChange = (e) => { // *
        // Not sure why (Added chatInfo and now needs this)
        e.persist();

        if(!this.state.booleans.botChat) {
            this.setState( (prevState) => ({
                chatInfo: {
                    ...prevState.chatInfo,
                    message: e.target.value
                }
            }), () => {
                this.checkIfTyping();
                this.checkIfSendable();
                this.seeAllMessages();
            })
        }
    }

    checkIfSendable = () => { // *
        if(this.state.chatInfo.message == '') {
            this.setState((prevState) => ({
                booleans: {
                    ...prevState.booleans,
                    sendable: false
                }
            }))
        } else {
            this.setState((prevState) => ({
                booleans: {
                    ...prevState.booleans,
                    sendable: true
                }
            }))
        }
    }

    checkIfTyping = () => { // *
        if(this.state.chatInfo.message == '') {
            // WEB SOCKET
            // SEND NOT TYPING EVENT 
            socket.send(JSON.stringify({
                type: "stoppedTyping",
                conversationID: this.state.chatInfo.conversationID,
                participantID: this.state.chatInfo.sender.id
            }))
            // this.mergeStoppedTyping(stoppedTyping(this.state.chatInfo.conversationID, this.state.chatInfo.sender.id));

            // this.setState((prevState) => ({
            //     booleans: {
            //         ...prevState.booleans, 
            //         typing: false
            //     }
            // }))

        } else if(this.state.chatInfo.message != '' && !this.state.booleans.typing) {
            // WEB SOCKET
            // SEND TYPING EVENT 
            socket.send(JSON.stringify({
                type: "nowTyping",
                conversationID: this.state.chatInfo.conversationID,
                participantID: this.state.chatInfo.sender.id
            }))
            // this.mergeNowTyping(nowTyping(this.state.chatInfo.conversationID, this.state.chatInfo.sender.id));

            // this.setState((prevState) => ({
            //     booleans: {
            //         ...prevState.booleans, 
            //         typing: true
            //     }
            // }))
        }
    }

    sendMessage = () => { // *
        if(this.state.booleans.sendable) {

            // this.socket.send({

            // }) 

            // (ASYNC) WEB SOCKET - SEND NEW MESSAGE EVENT
            // RECIEVE NEW CONVERSATIONS 
            // CONVERT INTO MESSAGES

            // this.mergeNewMessage(newMessage(conversationID, this.state.message, this.state.sender.id))
            // FIRE EVENT
            // MessageController uses messageStore

            // const messages = [...this.state.messages];
            // let newMessages = this.addMessageToObject(messages, {text: this.state.message, time: new Date(), seen: false, sender: this.state.sender.id})
            socket.send(JSON.stringify({
                type: "newMessage", 
                conversationID: this.state.chatInfo.conversationID, 
                message: {
                    sender: this.state.chatInfo.sender.id, 
                    text: this.state.chatInfo.message, 
                    time: new Date()
                }
            }))
            // this.mergeNewMessage(newMessage(this.state.chatInfo.conversationID, this.state.chatInfo.message, this.state.chatInfo.sender.id));
            this.setState((prevState) => ({
                chatInfo: {
                    ...prevState.chatInfo,
                    message: ''
                }
            }), () => {
                // Stopped Typing
                this.checkIfTyping();
                this.checkIfSendable();
            })
        } 
    }

    sendBotMessage = (message) => {
        setTimeout(() => {
            socket.send(JSON.stringify({
                type: "newMessage", 
                conversationID: this.state.chatInfo.conversationID, 
                message: {
                    sender: 'bot', 
                    text: message, 
                    time: new Date()
                }
            }))
            // this.mergeNewMessage(newMessage(this.state.chatInfo.conversationID, message, 'bot'));
        }, 2000)
    }

    handleKeyDown = (e) => { // *
        if (e.key === 'Enter') {
            if(this.state.booleans.nameChanged) {
                this.sendMessage();
            } else {
                this.setNewName();
            }
        }
    }

    switchSender = () => { // TESTER
        if(!this.state.booleans.botChat) {
            this.mergeStoppedTyping(stoppedTyping(this.state.chatInfo.conversationID, this.state.chatInfo.sender.id));
            this.setState((prevState) => ({
                chatInfo: {
                    ...prevState.chatInfo,
                    sender: {
                        name: prevState.chatInfo.responder.name, 
                        type: prevState.chatInfo.responder.type,  
                        id: prevState.chatInfo.responder.id, 
                    }, 
                    responder: {
                        name: prevState.chatInfo.sender.name, 
                        type: prevState.chatInfo.sender.type,
                        id: prevState.chatInfo.sender.id
                    }, 
                    message: '', 
                }
            }), () => { 
                this.seeAllMessages();
                this.checkIfTyping();
            } )
        }
    }

    toggleBotChat = () => { // *
        let obj = {}
        if(this.state.chatInfo.responder.type != 'bot') {
            obj.botChat = true;
            obj.responder = {
                name: 'Certax Bot', 
                type: 'bot', 
                id: receiveClientID()
            }
        } else {
            obj.botChat = false;
            if(this.state.chatInfo.sender.id == receiveClientID()) {
                obj.responder = {
                    name: this.state.messageStore[this.state.chatInfo.conversationID].participants[this.state.chatInfo.conversationID].name, 
                    type: 'visitor', 
                    id: this.state.chatInfo.conversationID
                }
            } else {
                obj.responder = {
                    name: this.state.messageStore[this.state.chatInfo.conversationID].participants[receiveClientID()].name, 
                    type: 'client', 
                    id: receiveClientID()
                }
            }
        }
        this.setState((prevState) => ({
            booleans: {
                ...prevState.booleans, 
                botChat: obj.botChat
            },
            chatInfo: {
                ...prevState.chatInfo,
                message: '',
                responder: obj.responder
            },
        }), () => this.updateMessages())
    }

    updateMessages = (callback) => { // *
        this.checkIfTyping();
        const messages = this.getMessagesFromStore(this.state.chatInfo.conversationID);
        this.setState((prevState) => ({
            chatInfo: {
                ...prevState.chatInfo,
                messages
            }
        }), () => callback)
    }



    messageOnClick = (m) => { // *
        const oldFocusedMessage = this.state.chatInfo.focusedMessage;
        let focusedMessage;
        if(oldFocusedMessage.messageID != m.messageID) {
            focusedMessage = m;
        } else {
            focusedMessage = '';
        }
        this.setState( (prevState) => ({
            chatInfo: {
                ...prevState.chatInfo,
                focusedMessage
            }
        }))
    }

    displayTimeChecker = () => { // *
        const now = new Date();
        if(this.state.messages.length != 0) {
            let lastMessageBlock = this.state.chatInfo.messages[this.state.chatInfo.messages.length - 1];
            let lastMessage = lastMessageBlock.messages[lastMessageBlock.messages.length - 1];
            let lastMessageTime = lastMessage.time;
            // console.log(dateHourDiff(lastMessageDate, now))
            if(dateHourDiff(lastMessageTime, now) > 1) {
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

    seeAllMessages = () => { // *
        // WEB SOCKET
        // SEEN BY
        console.log("1")
        if(this.state.chatInfo.messages.length != 0) {
            console.log("2")
            const messages = [...this.state.chatInfo.messages];
            const lastMessageBlock = messages[messages.length - 1];
            const lastMessageID = lastMessageBlock.messages[lastMessageBlock.messages.length - 1].messageID;
            socket.send(JSON.stringify({
                type: "seenMessage",
                conversationID: this.state.chatInfo.conversationID,
                participantID: this.state.chatInfo.sender.id,
                messageID: lastMessageID
            }))
            console.log("3", this.state.chatInfo.sender.id)
            // this.mergeSeenBy(seenBy(this.state.chatInfo.conversationID, this.state.chatInfo.sender.id, lastMessageID));
        }
    }

    requestChat = conversationID => {
        socket.send(JSON.stringify({
            type: "requestConversation", 
            conversationID
        }))
    }

    openChat = async(conversationID) => { // CLIENT
        let sender, responder;

        if(this.props.loggedIn) {
            sender = {
                name: "Certax", 
                type: "client", 
                id: receiveClientID()
            }
            responder = {
                name: this.state.messageStore[conversationID].participants[conversationID].name, 
                    type: this.returnType(conversationID), 
                    id: conversationID
            }
        } else {
            sender = {
                name: this.state.messageStore[conversationID].participants[conversationID].name, 
                    type: this.returnType(conversationID), 
                    id: conversationID
            }
            responder = {
                name: "Certax", 
                type: "client", 
                id: receiveClientID()
            }
        }
        this.setState( (prevState) => ({
            booleans: {
                ...prevState.booleans,
                chatOpen: true,
                botChat: false
            },
            chatInfo: {
                ...prevState.chatInfo,
                sender, 
                responder,
                conversationID, 
            },
            
        }), () => { 
            const messages = this.getMessagesFromStore(conversationID);
            this.setState((prevState) => ({
                chatInfo: {
                    ...prevState.chatInfo,
                    messages
                }
            }), () => {
                this.seeAllMessages();
                this.messageEndRef.current.scrollIntoView(); 
                
                // Probably not needed
                this.checkIfTyping();
            })
            
        })

    }

    returnType = (id) => { // *
        if(id == receiveClientID) {
            return 'client'
        } else {
            const patt = /\d{4}-\d{4}-\d{4}-\d{4}/g
            var result = patt.test(id);
            if(result) {
                return 'visitor'
            } else {
                return null;
            }
        } 
    }

    render() { 

        var chatOpen = this.state.booleans.chatOpen;
        var chatReady = this.state.booleans.chatReady;

        return ( 
            <>
            { (chatOpen || chatReady) ? <OpenChatBoxButton color={this.props.colors.blue} onClick={this.openChatbox} active={this.state.booleans.active}/> : '' }
            <div className={`${this.state.booleans.active && 'show'} chatbox-container`}>

                <div className='chatbox-top-bar' style={{backgroundColor: (!this.state.booleans.chatOpen) ? '#FAFAFA' : (this.state.chatInfo.responder.type == 'bot') ? this.props.colors.yellow : this.props.colors.blue}}>

                { (chatOpen) ? <MessageHeader responder={this.state.chatInfo.responder} // *
                                              typing={this.isTypingCheck(this.state.chatInfo.conversationID, this.state.chatInfo.responder.id)}
                                              // typing={this.state.messageStore[this.state.chatInfo.conversationID]} // other person typing value
                                              online={this.state.messageStore[this.state.chatInfo.conversationID].participants[this.state.chatInfo.responder.id].isOnline}
                                              colors={this.props.colors}
                                              switchSender={this.switchSender}
                                              toggleBotChat={this.toggleBotChat}
                                              closeChatbox={this.closeChatbox} 
                                              closeChat={this.closeChat}
                                              seeAllMessages={this.seeAllMessages}
                                              loggedIn={this.props.loggedIn}
                                              testing={this.props.testing} /> : 

                               <ChatsHeader colors={this.props.colors} // CLIENT
                                            closeChatbox={this.closeChatbox}/> }

                
                </div>


                <div className='chatbox-body'>

                    { (chatOpen) ? <MessageController messages={this.getMessagesFromStore(this.state.chatInfo.conversationID)} // *
                                       colors={this.props.colors} 
                                       senderID={this.state.chatInfo.sender.id}
                                       focusedMessage={this.state.chatInfo.focusedMessage} 
                                       ref={this.messageEndRef} 
                                       messageOnClick={this.messageOnClick}/> : 

                                    <ChatsController messageStore={this.state.messageStore} // CLIENT
                                                     colors={this.props.colors}
                                                     openChat={this.requestChat} 
                                                     ref={this.chatTopRef} />}
                    
                    
               
                </div>


                <div className='chatbox-input-container'>

                    { (chatOpen && !this.state.booleans.nameChanged) ? 
                                     <MessageInput messageValue={this.state.chatInfo.message} // *
                                      sendable={this.state.booleans.sendable}
                                      colors={this.props.colors}
                                      sendMessage={this.setNewName}
                                      handleMessageChange={this.handleMessageChange}
                                      handleKeyDown={this.handleKeyDown} /> : 
                                      
                                      (chatOpen && this.state.booleans.nameChanged) 
                                      ? 

                                      <MessageInput messageValue={this.state.chatInfo.message} // *
                                      sendable={this.state.booleans.sendable}
                                      colors={this.props.colors}
                                      sendMessage={this.sendMessage}
                                      handleMessageChange={this.handleMessageChange}
                                      handleKeyDown={this.handleKeyDown} />
                                      : 
                                      
                                    <ChatsFooter colors={this.props.colors}/> // CLIENT
                                } 
                    
                    

                </div>


            </div> 
            </>
        );
    }
}

// *
// messageStore
// chatInfo
// booleans
//

const OpenChatBoxButton = (props) => { // *
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

const MessageHeader = (props) => { // *
    return (
            <>    
                <div className='chatbox-top-bar-left'>
                    { (props.loggedIn) ? <CloseChat closeChat={props.closeChat}/> : '' } 
                    {/* Change back to closeChat */}
                    <div className='chatbox-top-bar-text'>
                        { (props.testing) ? <h3 onClick={props.switchSender}>{props.responder.name}</h3> : <h3>{props.responder.name}</h3> }
                        <Status typing={props.typing} online={props.online}/>
                    </div>
                </div>
                <div className='chatbox-top-bar-right'>
                    <SwitchChatButton responderType={props.responder.type} onClick={props.toggleBotChat} colors={props.colors}/>
                    <CloseChatboxButton color={'white'} onClick={props.closeChatbox}/>
                </div>
            </>

    )
}

const CloseChat = (props) => { // CLIENT
    return (
        <svg className='chatbox-top-bar-button' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 25.05" onClick={props.closeChat}>
            <rect fill="white" x="11.38" y="3.78" width="1.5" height="17.5" transform="translate(-10.71 18.05) rotate(-45)"/>
            <rect fill="white" x="3.77" y="0.33" width="17.5" height="1.5" transform="translate(-2.9 14.81) rotate(-45)"/>
        </svg>
    )
}

const Status = (props) => { // *
    let text;
    if(props.online) {
        text = (props.typing) ? "Typing" : "Active";
    } else {
        text = "Away";
    }
    return (
        <div className={`status ${props.typing ? 'typing' : ''} ${props.online ? 'status-active' : 'status-unactive'}`}>{text}
            <span/>
            <span/>
            <span/>
        </div>
    )
}

const SwitchChatButton = (props) => { // *
    const icon = (props.responderType != 'bot') ? <BotIcon onClick={props.onClick}/> : <WhiteC onClick={props.onClick}/>
    return (<div className={`chatbox-avatar chatbox-top-bar-button`} style={{height: '50px', backgroundColor: (props.responderType != 'bot' ? props.colors.yellow : props.colors.blue)}}>
                {icon}
            </div>
    )
}

const CloseChatboxButton = (props) => ( // *
    <svg className='chatbox-top-bar-button' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64.47 58.31" onClick={props.onClick}>
        <rect fill={props.color} className="cross" x="966.31" y="450.9" width="3.44" height="79.13" transform="translate(-1002.11 366.88) rotate(-45)" />
        <rect fill={props.color} className="cross" x="928.46" y="488.74" width="79.13" height="3.44" transform="translate(-1002.11 366.88) rotate(-45)" />
    </svg>
)

const MessageController = React.forwardRef((props, ref) => { // *
    const message_blocks = props.messages;
    let list = message_blocks.map((block, i) => (
        <MessageBlock key={`block_${new Date().getTime()}_${i}`} 
                      blockSender={block.sender} 
                      senderID={props.senderID} 
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

const MessageBlock = (props) => { // *
    let avatar;
    if(props.blockSender != props.senderID) {
        if(props.blockSender == 'bot') {
            avatar = <div className='chatbox-avatar' style={{backgroundColor: props.colors.yellow}}><BotIcon /></div>
        } else if (props.blockSender == receiveClientID()) {
            avatar = <div className='chatbox-avatar' style={{backgroundColor: props.colors.blue}}><WhiteC /></div>
        } else {
            avatar = <div className='chatbox-avatar' style={{backgroundColor: props.colors.blue}}><PersonIcon /></div>
        }
    }

    const messages = props.messages;
    let list = messages.map((message, i) => {
        const key = `message_${new Date().getTime()}_${i}`;
        const textAlign = (props.senderID == props.blockSender) ? 'right' : 'left';
        let showTime = false, showSeen = false, focusedMessage = false;
        if(props.focusedMessage.messageID == message.messageID) {
            showTime = true, focusedMessage = true;
            if(message.seen) {
                showSeen = true;
            }
        } 

        if(message.timeVisible) {
            showTime = true;
        }

        if(message.seen && message.seenVisible) {
            showSeen = true;
        }

        return (
            <div key={key} className='chatbox-message'>
                <Timestamp time={message.time} visible={showTime}/>
                <p onClick={() => props.messageOnClick(message)} style={{filter: (focusedMessage) ? 'brightness(.8)' : ''}} >{message.text}</p>
                <SeenLabel textAlign={textAlign} visible={showSeen}/>
            </div>

        )
    })

    return (
                <div className={`chatbox-messages-container ${props.senderID == props.blockSender ? 'sender' : 'responder'}`}>
                    { avatar }
                    <div className='chatbox-messages'>
                        {list}
                    </div>
                </div>
    )
}

const Timestamp = (props) => { // *
    let time = returnDate(props.time);
    return (
        <h4 className={`chatbox-timestamp ${(props.visible == true) ? '' : 'collapse'}`}>{time}</h4>
    )
}

const SeenLabel = (props) => { // *
    const textAlign = props.textAlign;
    return (
        <h5 className={`seen ${(props.visible == true) ? '' : 'collapse'}`} style={{textAlign}}>Seen</h5>
    )

}

const MessageInput = (props) => { // *
    return (
        <>
            <input className='chatbox-input' type='text' placeholder='Type your message...' value={props.messageValue} onChange={props.handleMessageChange} onKeyDown={props.handleKeyDown}/>
            <SendButton color={(props.sendable) ? props.colors.blue : props.colors.grey} onClick={props.sendMessage }/>
        </>
    )
}

const SendButton = (props) => { // *
    return (
        <svg className='send-button' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.41 27.46" onClick={props.onClick}>
            <path fill={props.color} d="M859.53,213.37l-26.39-12.23a1.5,1.5,0,0,0-2,1.88l4.25,11.71-4.26,11.71a1.5,1.5,0,0,0,.88,1.93,1.53,1.53,0,0,0,1.17-.05l26.39-12.22a1.5,1.5,0,0,0,0-2.73Z" transform="translate(-831 -201)" />
        </svg>
    )
}











const WhiteC = (props) => ( // *
    <svg className={`chatbox-avatar-icon ${(props.onClick != undefined) ? 'clickable' : ''}`} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 204.13 226.05" onClick={props.onClick}>
        <path fill='white' d="M1073.65,351.91a94.52,94.52,0,0,1-13.55,88.61,99.7,99.7,0,0,0-150.69-114.4,94.61,94.61,0,0,1,164.24,25.79Z" transform="translate(-875.02 -289)" />
        <path fill='white' d="M945.26,513.56A94.51,94.51,0,0,1,875,457.87a99.7,99.7,0,0,0,174-74.18,94.6,94.6,0,0,1-103.8,129.87Z" transform="translate(-875.02 -289)" />
        <path fill='white' d="M970.52,341.59c12.87,0,22.36,3.56,28.46,9.65l4.57-8.13h6.27s-3.22,16.1-3.22,23.38v11.18h-7.11v-6.44c0-14.06-11-23.71-28.8-23.71-29.82,0-36.25,27.44-36.25,52.51,0,27.78,7.79,52.35,37.27,52.35,17.95,0,27.78-9.49,31.84-27.11l6.78,1c-3.39,15.92-12.54,32-40,32-33.71,0-51.16-24.06-51.16-58.79C919.19,364.46,937.32,341.59,970.52,341.59Z" transform="translate(-875.02 -289)" />
    </svg>
)

const BotIcon = (props) => ( // *
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

const PersonIcon = () => ( // *
    <svg className='chatbox-avatar-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.9 49.65">
        <rect fill='none' stroke='white' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='4px' x="10.91" y="2" width="25.08" height="25.08" rx="12.54" />
        <path fill='none' stroke='white' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='4px' d="M29.39,73.67A23.16,23.16,0,0,1,50.84,59.09h0A23.16,23.16,0,0,1,72.29,73.67" transform="translate(-27.39 -26.02)" />
    </svg>
)

const MessageIcon = (props) => ( // *
    <svg className='chatbox-avatar-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 475.04 332.17">
        <path fill={props.colors.yellow} d="M1163,572.4h3.13v14.14c0,20.33-17.07,36.81-38.14,36.81H872.24l-.09,1.07a174.57,174.57,0,0,0,.79,37.23v.05c0,.22.07.44.09.67a.06.06,0,0,1,0,.06,7.85,7.85,0,0,1-5.81,8.19,8.32,8.32,0,0,1-8.8-2.66l-.61-.85-30.91-43.76H790.32c-21.07,0-38.15-16.48-38.15-36.81V445.87c0-20.33,17.08-36.82,38.15-36.82h2.89V516.28c0,30.94,26.09,56.12,58.14,56.12h236.48q-.13,6.95-.88,13.66l-.19,4-.31,5.43a27.52,27.52,0,0,0,20,23.36,29,29,0,0,0,8.12,1.15h0a28.71,28.71,0,0,0,22.19-10.45l.33-.42.93-1.28Z" transform="translate(-752.17 -338.79)"/>
        <path fill={props.colors.blue} d="M1227.21,375.61V516.28c0,20.33-17.08,36.81-38.15,36.81h-36.59l-30.91,43.76-.61.85a8.35,8.35,0,0,1-8.8,2.67,7.86,7.86,0,0,1-5.81-8.2.06.06,0,0,1,0-.06c0-.23.05-.45.09-.67v-.05a174.49,174.49,0,0,0,.79-37.22l-.09-1.08H851.35c-21.07,0-38.14-16.48-38.14-36.81V375.61c0-20.33,17.07-36.82,38.14-36.82h337.71C1210.13,338.79,1227.21,355.28,1227.21,375.61Z" transform="translate(-752.17 -338.79)"/>
    </svg>
)



const ChatsHeader = (props) => { // CLIENT
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

const ChatsController = React.forwardRef((props, ref) => { // CLIENT
    // key, name, quoteID, lastMessage, unseenCount, openChat, colors
    const messageStore = props.messageStore;
    const ArrayMessageStore = Object.entries(messageStore);
    if(ArrayMessageStore.length != 0) {
        let chatListItems = ArrayMessageStore.map(array => {
            
            let conversationID = array[0];
            let info = array[1];

            // let unseenCount = Math.abs(info.participants[conversationID].lastMessageSeenID - info.participants[receiveClientID()].lastMessageSeenID);
            let unseenCount = info.latestMessage.messageID - info.participants[receiveClientID()].lastMessageSeenID;
            // console.log(`${info.participants[conversationID].name} ---> user last seen ID: ${info.participants[conversationID].lastMessageSeenID}, client last seen ID: ${info.participants[receiveClientID()].lastMessageSeenID}`);
            // console.log(`${info.participants[conversationID].name}  unseenCount:  ${unseenCount}`);
            if(Object.keys(info.latestMessage).length != 0) {
                return (
                <ChatListItem latestMessage={info.latestMessage}
                            name={info.participants[conversationID].name}
                            conversationID={conversationID}
                            online={info.participants[conversationID].isOnline}
                            typing={info.participants[conversationID].isTyping}
                            key={conversationID}
                            openChat={props.openChat}
                            colors={props.colors}
                            unseenCount={unseenCount}
                            lastMessageSeenID={info.participants[receiveClientID()].lastMessageSeenID}/>
                )
            }
        })
        chatListItems = chatListItems.filter( x => x != undefined );
        // Order list (NEED TO DO)
        let orderedList = [];
        let list = [...chatListItems];
        const listLength = list.length;
        for(var j = 0; j < listLength; j++) { 
            let leastSeconds, mostRecentMessage;
            leastSeconds = secondsFromNow(list[0].props.latestMessage.time);
            mostRecentMessage = list[0];

            for(var i = 1; i < list.length; i++) {
                if(secondsFromNow(list[i].props.latestMessage.time) < leastSeconds && !orderedList.includes(list[i])) {
                    leastSeconds = secondsFromNow(list[i].props.latestMessage.time);
                    mostRecentMessage = list[i];
                } 
            }

            orderedList.push(mostRecentMessage);
            list = list.filter(x => x != mostRecentMessage);
        }
        return (
            <>
                <div ref={ref} />
                {orderedList}
            </>
        )
    } else {
        return <div />
    }
})

const ChatListItem = (props) => { // CLIENT
    let seen = false;
    if(props.latestMessage.messageID <= props.lastMessageSeenID) {
        seen = true;
    }

    let unseenMessageCount = 0;
    if(props.latestMessage.sender == receiveClientID()) {
        unseenMessageCount = 0;
    } else {
        unseenMessageCount = props.unseenCount;
    }
    let unseenMessagesLabel = (unseenMessageCount == 0) ? '' : <p style={{backgroundColor: props.colors.blue}}>{unseenMessageCount}</p>;
    return (
        <div className='chat-list-item-container' onClick={() => props.openChat(props.conversationID)}>
            <div className={`chatbox-avatar ${props.online ? 'online': ''}`} style={{backgroundColor: props.colors.blue}}><PersonIcon /></div>
            <div className='chat-list-item-content'>
                <div className='chat-list-item-top-row'>
                    <h3>{props.name}</h3>
                    <p>{returnShortDate(new Date(props.latestMessage.time))}</p>
                </div>
                <div className='chat-list-item-bottom-row'>
                    <TrimmedText text={props.latestMessage.text} seen={seen} sender={props.latestMessage.sender} typing={props.typing} colors={props.colors}/>
                    <div className='chat-list-item-messages-counters'>
                        {unseenMessagesLabel}
                        {/* <p style={{backgroundColor: props.colors.yellow}}>2</p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

const TrimmedText = (props) => { // CLIENT
    let out;
    const charLimit = 25;
    let style = {};

    // Shortening
    if(!props.typing) {
        if(props.text.length > charLimit) {
            if(props.sender != receiveClientID()) {
                if(props.sender == 'bot') {
                    out = `Bot: ${props.text.substring(0, charLimit - 5)}...`;
                } else {
                    out = `${props.text.substring(0, charLimit - 1)}...`;
                }
            } else {
                out = `You: ${props.text.substring(0, charLimit - 5)}...`;
            }
        } else {
            if(props.sender != receiveClientID()) {
                if(props.sender == 'bot'){
                    out = `Bot: ${props.text}`;
                } else {
                    out = props.text;
                }
            } else {
                out = `You: ${props.text}`;
            }
        }

        if(props.seen || props.sender == receiveClientID()) {
            style = {
                color: '#9E9E9E', 
                fontWeight: 100
            }
        } else {
            if(props.sender == 'bot') {
                style = {
                    color: props.colors.yellow, 
                    fontWeight: 500
                }
            } else {
                style = {
                    color: props.colors.blue, 
                    fontWeight: 500
                }
            }
        }
    } else {
        out = "Typing";
        style = {
            color: props.colors.yellow, 
            fontWeight: 100
        }
    }

    return (
        <div className={`trimmed-text ${props.typing ? 'smallbounce' : ''}`} style={style}>{out}
            <span style={{backgroundColor: props.colors.yellow}}/>
            <span style={{backgroundColor: props.colors.yellow}}/>
            <span style={{backgroundColor: props.colors.yellow}}/>
        </div>
    )
}

const ChatsFooter = (props) => { // CLIENT
    return (
        <div className={`chatbox-avatar center-top`} style={{backgroundColor: props.colors.blue}}><WhiteC /></div>
    )
}

export default Chatbox;

// Empty message store => receiveConversation, receiveConversationOverviews, seenBy, nowTyping/stoppedTyping, newMessage EVENTS merge with message store
//
// receiveConversation merges: - latestMessage, messages
// receiveConversationOverviews: - latestMessgae
// receive seenBy: - a MESSAGE
// receive nowTyping/stoppedTyping: - typers
// receive newMessage: - latestMessage, messages

// ACTIONS: 
// 1) Start with clear chatbox (and store) and wait for message event
// 2) Click on chat, and INTERACT
// 3) A) Write a message
//    B) Seen message
//    C) nowTyping / stoppedTyping
//    D) Receieve a message
// 4) Close chat





// CHATBOX - USER
// 1) Open chatbox
// 2) Load quote messages in bot chatbox
// 3) IF name == ID, nameChanged == false
//     3a) Receive bot message asking to change name
//     3b) Enter name
//     3c) Receive bot messaging confirming name being sent
// 4) ELSE
// 5) Conversate

// IF quote has already been done before, open and run ReceiveConversationOverview and ReceiveConversation 

// SEND MESSAGE x
// RECEIVE MESSAGE
// SEE MESSAGE
// NOW TYPING
// STOPPED TYPING
// RECEIVE CONVERSATION

// FIXES
// Seen not working for client
// Visual bug on Renaldos's phone
// Delivered feature
// Now online and offline
// 'Bot' messages to 'bot'
// Bot 