const clientID = "123456789";
let count = 4;

// newMessage
export function newMessage(conversationID, text, sender) {
    increment();
    return {
        type: "newMessage", 
        conversationID, 
        message: {
            sender, 
            text, 
            time: new Date(), 
            messageID: count, 
        }
    }
}

export function receiveConversationOverviews() {
    return {
        type: "receiveConversationOverviews", 
        conversationOverviews: [
            {
                conversationID: "1111-2222-3333-4444", 
                participants: {
                    "1111-2222-3333-4444": {
                        lastMessageSeenID: 2, 
                        isTyping: false, 
                        isOnline: false, 
                        name: "Jenny"
                    }, 
                    [clientID]: {
                        lastMessageSeenID: 4, 
                        isTyping: false, 
                        isOnline: true, 
                        name: "Certax"
                    }
                }, 
                latestMessage: {
                    sender: clientID, 
                    text: "What a waste of space", 
                    time: "Fri Sep 25 2020 21:21:45 GMT+0100 (GMT+01:00)",
                    messageID: 4
                }
           },{
            conversationID: "1234-2345-3456-4567", 
            participants: {
                "1234-2345-3456-4567": {
                    lastMessageSeenID: 3, 
                    isTyping: false, 
                    isOnline: true, 
                    name: "Jimbo"
                }, 
                [clientID]: {
                    lastMessageSeenID: -1, 
                    isTyping: false, 
                    isOnline: true, 
                    name: "Certax"
                }
            }, 
            latestMessage: {
                sender: "1234-2345-3456-4567", 
                text: "Help me please!", 
                time: "Fri Sep 23 2020 19:20:45 GMT+0100 (GMT+01:00)",
                messageID: 3
            }
           }
        ]
    }
}

export function receiveConversation(conversationID) {
    const conversations = {
        "1111-2222-3333-4444": {
            messages: [
                {
                    sender: "1111-2222-3333-4444", 
                    text: "You absolute tosser", 
                    time: "Fri Sep 25 2020 19:20:45 GMT+0100 (GMT+01:00)",
                    messageID: 0
                }, 
                {
                    sender: "1111-2222-3333-4444", 
                    text: "Message back PLEASE", 
                    time: "Fri Sep 25 2020 19:21:45 GMT+0100 (GMT+01:00)",
                    messageID: 1
                },
                {
                    sender: clientID, 
                    text: "What do you want?", 
                    time: "Fri Sep 25 2020 19:21:45 GMT+0100 (GMT+01:00)",
                    messageID: 2
                },
                {
                    sender: clientID, 
                    text: "What a waste of space", 
                    time: "Fri Sep 25 2020 21:21:45 GMT+0100 (GMT+01:00)",
                    messageID: 4
                },
            ]
        }, 
        "1234-2345-3456-4567": {
            messages: [
                {
                    sender: "1234-2345-3456-4567", 
                    text: "Help me please!", 
                    time: "Fri Sep 23 2020 19:20:45 GMT+0100 (GMT+01:00)",
                    messageID: 3
                }
            ]
        }
    }

    return {
        type: "receiveConversation", 
        conversationID, 
        messages: conversations[conversationID].messages
    }
}

export function seenBy(conversationID, participantID, messageID) {
    return {
        type: "seenBy", 
        conversationID, 
        participantID, 
        messageID
    }
}

export function nowTyping(conversationID, participantID) {
    return {
        type: "nowTyping", 
        conversationID, 
        participantID
    }
}

export function stoppedTyping(conversationID, participantID) {
    return {
        type: "stoppedTyping", 
        conversationID, 
        participantID
    }
}

export function receiveClientID() {
    return clientID;
}

function increment() {
    count++;
}