const express = require('express');
const router = express.Router();
const botUtil = require('../utils/botUtil');

router.get('/webhook', (req, res) => {

    // Your verify token. Should be a random string.
    const VERIFY_TOKEN = "test_token";
      
    // Parse the query params
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
      
    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
    
      // Checks the mode and token sent is correct
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        
        // Responds with the challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);      
      }
    }
  });

  router.post('/webhook', (req, res) => {  
 
    const {body} = req;
    // Checks this is an event from a page subscription
    if (body.object === 'page') {
  
      // Iterates over each entry - there may be multiple if batched
      body.entry.forEach( (entry) => {
        // Gets the message. entry.messaging is an array, but 
        // will only ever contain one message, so we get index 0
        const [webhook_event] = entry.messaging;
        const senderId = webhook_event.sender.id;
        botUtil.handleMessage(senderId, webhook_event);
        console.log(webhook_event);
      });
  
      // Returns a '200 OK' response to all requests
      res.status(200).send('EVENT_RECEIVED');
    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
  
  });

module.exports = router;
