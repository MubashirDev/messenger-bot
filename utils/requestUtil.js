const { sendMessage } = require('./messageUtil');
const { productInfo } = require('./productUtil');

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

const getRequestType = (message) => {
    try {
        const messageSplited = message.split(" ")
        return messageSplited[0].substring(1)
    }
    catch (err) {

        return "Request not found"
    }

}


const handleRequest = async (sender, message) => {
    const requestList = ["desc", "price", "shipping", "buy"];

    let request = getRequestType(message);
    let productId = getProductId(message);

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