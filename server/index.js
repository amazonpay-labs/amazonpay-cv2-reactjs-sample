const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT;

const app = express();
const AmazonPayClient = require('./amazonPayClient');

const chargePermission = require('./chargePermission');
const charge = require('./charge');
const amazonPay = new AmazonPayClient();
const checkoutSessionManager = require('./checkoutSessionManager');

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/buttonSignature", (req, res) => {
    const payload = {
        webCheckoutDetails: {
            checkoutReviewReturnUrl: 'http://localhost:'+process.env.PORT+'/review'
        },
        storeId: process.env.CLIENT_ID
    
    };
    const signature = amazonPay.amazonpayClient.generateButtonSignature(payload);
    console.log("buttonSignature created");
    res.json({
        payloadJSON: payload,
        signature: signature
    });
});


app.get("/getCheckoutSession", (req, res) => {
    console.log("checkoutSession called");
    console.log("query", req.query);
    checkoutSessionManager.getCheckoutSession(req.query.CheckoutSessionId, amazonPay.webstoreClient)
    .then((response) => {
        res.json(
            response.data
       )
    });
    
});

app.get("/updateCheckoutSession", (req, res) => {
    console.log("Calling updateCheckoutSession", req.query);
    checkoutSessionManager.updateCheckoutSession(req.query.checkoutSessionId, amazonPay.webstoreClient)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      console.log('Error in update:', err);
    });
});

app.get("/completeCheckoutSession", (req, res) => {
    checkoutSessionManager.completeCheckoutSession(req.query.CheckoutSessionId, amazonPay.webstoreClient)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log('Error in complete', typeof err);
      console.log('----------------------------------------------------');
      console.log('Error in complete', typeof err.response.data);

      console.log('----------------------------------------------------');
      res.send(err.response.data);
    });
});

app.get('/getChargePermission', (req, res) => {
    chargePermission.getChargePermission(req.query.chargePermissionId, amazonPay.webstoreClient)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log('Error in chargePermission Fetch', typeof err);
      console.log('----------------------------------------------------');
      console.log('Error in chargePermission Fetch', typeof err.response.data);

      console.log('----------------------------------------------------');
      res.send(err.response.data);
    });
});

app.get('/getCharge', (req, res) => {
    charge.getCharge(req.query.charge, amazonPay.webstoreClient)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log('Error in chargePermission Fetch', typeof err);
      console.log('----------------------------------------------------');
      console.log('Error in chargePermission Fetch', typeof err.response.data);

      console.log('----------------------------------------------------');
      res.send(err.response.data);
    });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
