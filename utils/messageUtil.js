const axios = require('axios');

const sendMessage = async (senderId, response) => {
    
    const url = `https://graph.facebook.com/v13.0/me/messages?access_token=${process.env.FB_ACCESS_TOKEN}`;
    console.log(response);
    try {
        const res = await axios.post(url, {
            "recipient": {
                "id": senderId
            },
            "message":{
                "text": response
            }
        });
    } catch (error) {
        console.log(error);
    }
          
}

module.exports = {
    sendMessage
}