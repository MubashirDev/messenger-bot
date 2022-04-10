const { sendMessage } = require('./messageUtil');
const { productInfo } = require('./productUtil');

// to split product id from message
const getProductId = (message) => {
    try {
        const messageSplited = message.split(" ")
        const prodId = messageSplited[1] ? messageSplited[1] : "";
        return prodId
    }
    catch (err) {
        return ""
    }

}
//get requst type from message
const getRequestType = (message) => {
    try {
        const messageSplited = message.split(" ")
        return messageSplited[0].substring(1)
    }
    catch (err) {

        return "Request not found"
    }

}

//to get product info
const handleRequest = async (sender, message) => {
    const requestList = ["desc", "price", "shipping", "buy"];

    let request = getRequestType(message);
    let productId = getProductId(message);
//checkk if request is in request list
    if (requestList.includes(request)) {

        if (request === "desc") {
            await sendMessage(sender, productInfo(productId, "description"))
        }
        if (request === "price") {
            await sendMessage(sender, productInfo(productId, "price"))
        }
        if (request === "shipping") {
            await sendMessage(sender, productInfo(productId, "shipping"))
        }
        if (request === "buy") {
            await sendMessage(sender, productInfo(productId, "buy"))
        }
    }
    else {
        await sendMessage(sender, "Request not found")
    }
}



module.exports = {
    handleRequest
}