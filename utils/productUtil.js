
const products = require("../products.json")
const { sendEmail } = require("./sendgridUtil")

const getProductInfo = (productId, attribute) => {
    const foundProduct = products.find(function (item) {
        return item.sku == productId
    });

    if (foundProduct === undefined)
        return "product not found!"

    return foundProduct[attribute]

}

const getProductAllInfo = (productId) => {
    const foundProduct = products.find(function (item) {
        return item.sku == productId
    });
    if (foundProduct === undefined)
        return {}
    return foundProduct
}


function productInfo(productId, requestType) {

    switch (requestType) {
        case "buy":
            let product = getProductAllInfo(productId)
            if(!product["sku"])
                return "product not found!"
                sendEmail(product)
            return "thank u for buy this!"
        default:
            return getProductInfo(productId, requestType)

    }
}
module.exports = {
    productInfo
}