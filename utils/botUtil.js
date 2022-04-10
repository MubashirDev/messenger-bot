const { handleRequest } = require('./requestUtil');
const { isFirstMessage, createUser } = require('./userUtil');
const helloMessages = ["Hi", "Hello", "Good morning"]
const helloMessageResponses = ["How are you?", "I hope you're doing well.", "I hope you're having a great day."]

const checkIfGreeting = message => helloMessages.includes(message)

const replyHello = () => helloMessageResponses[Math.floor(Math.random() * helloMessageResponses.length)];

const { sendMessage } = require('./messageUtil');


const handleMessage = async (userId,message) => {
    const firstMessage = await isFirstMessage(userId);
    const msg = message.message.text;
    if (firstMessage) {
        await sendMessage(userId, replyHello());
        await createUser(userId);
        return;
    }
    if (checkIfGreeting(msg)) {
        await sendMessage(userId,  replyHello() )
        return
    }
    if(msg.includes("/")){
        await handleRequest(userId, msg)
        return
    }
}

module.exports = {
    handleMessage
}