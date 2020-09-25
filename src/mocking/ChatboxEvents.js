const clientID = "123456789";
let count = 0;

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
                        lastMessageSeenID: 4, 
                        isTyping: false, 
                        isOnline: false, 
                        name: "Jenny"
                    }, 
                    [clientID]: {
                        lastMessageSeenID: 2, 
                        isTyping: false, 
                        isOnline: true, 
                        name: "Certax"
                    }
                }, 
                latestMessage: {
                    sender: "1111-2222-3333-4444", 
                    text: "This is the latest message from Jenny", 
                    time: "Fri Sep 20 2020 15:11:30 GMT+0100 (GMT+01:00)",
                    messageID: 4
                }
           },{
            conversationID: "1234-2345-3456-4567", 
            participants: {
                "1234-2345-3456-4567": {
                    lastMessageSeenID: 10, 
                    isTyping: false, 
                    isOnline: false, 
                    name: "Jimbo"
                }, 
                [clientID]: {
                    lastMessageSeenID: 3, 
                    isTyping: false, 
                    isOnline: true, 
                    name: "Certax"
                }
            }, 
            latestMessage: {
                sender: "1234-2345-3456-4567", 
                text: "Hi my name is Jimbo", 
                time: "Fri Sep 23 2020 15:14:08 GMT+0100 (GMT+01:00)",
                messageID: 10
            }
           }
        ]
    }
}

export function receiveClientID() {
    return clientID;
}

function increment() {
    count++;
}