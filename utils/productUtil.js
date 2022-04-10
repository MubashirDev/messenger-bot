
const products = require("../products.json")
const { sendEmail } = require("./sendgridUtil")
// to get specific info for product
const getProduct = (productId, attribute) => {
    const product = products.find(function (item) {
        return item.sku == productId
    });
    if (product === undefined)
        return "product not found!"
    return product[attribute]
}

//to get full info for buy operation
const getProductFullInfo = (productId) => {
    const product = products.find(function (item) {
        return item.sku == productId
    });
    if (product === undefined)
        return {}
    return product
}

//get product related info
function productInfo(productId, requestType) {
    //get product info
    switch (requestType) {
        case "buy":
            const product = getProductFullInfo(productId)
            if(!product["sku"])
                return "product not found!"
                sendEmail(product)
            return "buy product"
        default:
            return getProduct(productId, requestType)

    }
}
module.exports = {
    productInfo
}