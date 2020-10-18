window.sendEventG = function sendEvent(event){
    window.chatSocket.send(JSON.stringify(event))
}

window.QUOTE_UID = "70bb3418-a722-4476-80b3-9372a2552ed5"

//Test guest Sending message
window.guestMessageG = {
    type: "newMessage", 
    conversationID: QUOTE_UID, 
    message: {
        sender: QUOTE_UID, 
        text: "Message 1", 
        time: new Date(), 
    }
}

//Test Client sending message
window.clientMessageG = {
    type: "newMessage", 
    conversationID: QUOTE_UID, 
    message: {
        sender: "clientID", 
        text: "Message 2", 
        time: new Date(), 
    }
}

window.requestConversationOverviewsG = {
    type: "requestConversationOverviews"
}

window.requestConversationG = {
    type: "requestConversation",
    conversationID: QUOTE_UID
}

window.guestNowTypingG = {
    type: "nowTyping",
    conversationID: QUOTE_UID,
    participantID: QUOTE_UID
}

window.clientNowTypingG = {
    type: "nowTyping",
    conversationID: QUOTE_UID,
    participantID: "clientID"
}

window.guestStoppedTypingG = {
    type: "stoppedTyping",
    conversationID: QUOTE_UID,
    participantID: QUOTE_UID
}

window.clientStoppedTypingG = {
    type: "stoppedTyping",
    conversationID: QUOTE_UID,
    participantID: "clientID"
}

window.guestChangeName = {
    type: "changeName",
    conversationID: QUOTE_UID,
    participantID: QUOTE_UID,
    name: "King Jeooff"
}

window.clientChangeName = {
    type: "changeName",
    conversationID: QUOTE_UID,
    participantID: "clientID",
    name: "newClient"
}