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

function increment() {
    count++;
}