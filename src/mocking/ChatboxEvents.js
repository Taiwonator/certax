const clientID = "123456789";
let count = 5;

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

export function receiveConversationOverviews(conversationID) {
    const overviews = {
        type: "receiveConversationOverviews", 
        conversationOverviews: [
            {
                conversationID: "1111-2222-3333-4444", 
                participants: {
                    "1111-2222-3333-4444": {
                        lastMessageSeenID: 2, 
                        isTyping: true, 
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
            latestMessage:  {
                sender: "bot", 
                text: "Hi this is a bot message", 
                time: "Thu Oct 01 2020 15:09:29 GMT+0100 (GMT+01:00)", 
                messageID: 5
              }
           },{
            conversationID: "1234-1234-1234-1234", 
            participants: {
                "1234-1234-1234-1234": {
                    lastMessageSeenID: -1, 
                    isTyping: false, 
                    isOnline: false, 
                    name: "Jimbo"
                }, 
                [clientID]: {
                    lastMessageSeenID: -1, 
                    isTyping: false, 
                    isOnline: false, 
                    name: "Certax"
                }
            }, 
            latestMessage:  {}
           }
        ]
    }
    let out;
    if(conversationID) {
        for(var i = 0; i < overviews.conversationOverviews.length; i++) {
            if(overviews.conversationOverviews[i].conversationID == conversationID) {
                out = {
                    type: 'receiveConversationOverviews', 
                    conversationOverviews: [
                        overviews.conversationOverviews[i]
                    ]
                }
            }
        }
    } else {
        out = overviews;
    }
    return out;
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
                }, 
                {
                    sender: "bot", 
                    text: "Hi this is a bot message", 
                    time: "Thu Oct 01 2020 15:09:29 GMT+0100 (GMT+01:00)", 
                    messageID: 5
                }
            ]
        }, 
        "1234-1234-1234-1234": {
            messages: []
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

export function changeName(conversationID, participantID, name) {
    return {
        type: "changeName", 
        conversationID, 
        participantID, 
        name
    }
} 

export function nowOnline(conversationID, participantID) {
    return {
        type: "nowOnline", 
        conversationID, 
        participantID
    }
}

export function nowOffline(conversationID, participantID) {
    return {
        type: "nowOffline", 
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