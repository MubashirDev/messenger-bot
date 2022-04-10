const { handleRequest } = require('./requestUtil');
const { isFirstMessage, createUser } = require('./userUtil');
const { sendMessage } = require('./messageUtil');

const helloMessages = ["Hi", "Hello", "Good morning"]
const helloMessageResponses = ["How are you?", "I hope you're doing well.", "I hope you're having a great day."]

//check if message is Hi, Hello, Good morning
const checkHelloMessage = message => helloMessages.includes(message)

//send Hi, Hello, Good morning message response randomly
const replyHello = () => helloMessageResponses[Math.floor(Math.random() * helloMessageResponses.length)];



const handleMessage = async (userId,message) => {
    //check if user exists
    const firstMessage = await isFirstMessage(userId);
    //if user doesn't exist, create user
    const msg = message.message.text;
    if (firstMessage) {
        //senf first message to user
        await sendMessage(userId, replyHello());
        //if user doesn't exist, create user
        await createUser(userId);
        return;
    }
    // check if message is Hi, Hello, Good morning
    if (checkHelloMessage(msg)) {
        //send response
        await sendMessage(userId, replyHello());
        return
    }
    //check if it contains a product info
    if(msg.includes("/")){
        //will fetch product info
        await handleRequest(userId, msg)
        return
    }
    //if it doesn't contain a product info, send default message
    await sendMessage(userId,  "request can not be entertained" );
}

module.exports = {
    handleMessage
}