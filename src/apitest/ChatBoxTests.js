function sendEvent(event){
    window.chatSocket.send(JSON.stringify(event))
}

//Test guest Sending message
const guestMessage = {
    type: "newMessage", 
    conversationID: "7477d7c6-1c89-4284-aa4a-97461f9cf398", 
    message: {
        sender: "7477d7c6-1c89-4284-aa4a-97461f9cf398", 
        text: "Message 1", 
        time: new Date(), 
    }
}

//Test Client sending message
const clientMessage = {
    type: "newMessage", 
    conversationID: "7477d7c6-1c89-4284-aa4a-97461f9cf398", 
    message: {
        sender: "clientID", 
        text: "Message 2", 
        time: new Date(), 
    }
}