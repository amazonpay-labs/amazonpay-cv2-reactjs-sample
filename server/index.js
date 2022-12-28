const path = require('path');
const express = require("express");
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT;

const app = express();
const fs = require('fs');
const Client = require('@amazonpay/amazon-pay-api-sdk-nodejs');
const uuidv4 = require('uuid/v4');
const updateCheckoutSession = require('./updateCheckout');
const completeCheckoutSession = require('./completeCheckout');
const chargePermission = require('./chargePermission');
const charge = require('./charge');
const config = {
    publicKeyId: process.env.PUBLIC_KEY,
    privateKey: fs.readFileSync(process.env.PRIVATE_KEY),
    region: process.env.REGION,
    sandbox: true
};

const testPayClient = new Client.AmazonPayClient(config);
const payload = {
    webCheckoutDetails: {
        checkoutReviewReturnUrl: 'http://localhost:'+process.env.PORT+'/review'
    },
    storeId: process.env.CLIENT_ID

};
const signature = testPayClient.generateButtonSignature(payload);


app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/buttonSignature", (req, res) => {
    console.log("buttonSignature called");
    res.json({
        payloadJSON: payload,
        signature: signature
    });
});

const WebStoreClient = new Client.WebStoreClient(config);

app.get("/getCheckoutSession", (req, res) => {
    console.log("checkoutSession called");
    const headers = {
        'x-amz-pay-idempotency-key': uuidv4().toString().replace(/-/g, '')
    };
    console.log("TestClient", WebStoreClient);
    console.log("query", req.query);
    WebStoreClient.getCheckoutSession(req.query.CheckoutSessionId, headers)
    .then((response) => {
        res.json(
            response.data
       )
    });
    
});

app.get("/updateCheckoutSession", (req, res) => {
    console.log("Calling updateCheckoutSession", req.query);
    updateCheckoutSession.updateCheckoutSession(req.query.checkoutSessionId)
    .then((response) => {
        res.json(
            response.data
        )
    })
    .catch((err) => {
        console.log("Error in update:", err);
    })
});

app.get("/completeCheckoutSession", (req, res) => {
    completeCheckoutSession.completeCheckoutSession(req.query.CheckoutSessionId)
    .then((response) => {
        res.send(response.data)
    })
    .catch((err) => {
        console.log("Error in complete",typeof err);
        console.log("----------------------------------------------------")
        console.log("Error in complete",typeof err.response.data);

        console.log("----------------------------------------------------")
        res.send(err.response.data);
    })
});

app.get('/getChargePermission', (req, res) => {
    chargePermission.getChargePermission(req.query.chargePermissionId)
    .then((response) => {
        res.send(response.data);
    })
    .catch((err) => {
        console.log("Error in chargePermission Fetch",typeof err);
        console.log("----------------------------------------------------")
        console.log("Error in chargePermission Fetch",typeof err.response.data);

        console.log("----------------------------------------------------")
        res.send(err.response.data);
    })
});

app.get('/getCharge', (req, res) => {
    charge.getCharge(req.query.charge)
    .then((response) => {
        res.send(response.data);
    })
    .catch((err) => {
        console.log("Error in chargePermission Fetch",typeof err);
        console.log("----------------------------------------------------")
        console.log("Error in chargePermission Fetch",typeof err.response.data);

        console.log("----------------------------------------------------")
        res.send(err.response.data);
    })
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

