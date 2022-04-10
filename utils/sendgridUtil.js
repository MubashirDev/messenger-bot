const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);

const sendEmail = (product) => {
    const msg = {
        to: 'mubashirkhandev@gmail.com', 
        from: 'muba@example.com', // Change to your verified sender
        subject: 'Order',
        text: `Product. Name: ${product.name}, Description: ${product.description}, Shipping Fee: ${product.shipping}`,
      }
    sgMail.send(msg);
}
module.exports = {
    sendEmail
}