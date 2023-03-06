const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require("cookie-parser");
const session = require('express-session');
const uuidv4 = require('uuid/v4');
const PORT = process.env.PORT;

const app = express();
const AmazonPayClient = require('./amazonPayClient');

const amazonPay = new AmazonPayClient();
const checkoutSessionManager = require('./checkoutSessionManager');
const bodyParser = require('body-parser');
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: uuidv4().toString(),
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: true 
}));
const jsonParser = bodyParser.json();

app.get("/buttonSignature", (req, res) => {

    const payload = {
        webCheckoutDetails: {
            checkoutReviewReturnUrl: 'http://localhost:'+process.env.PORT+'/review'
        },
        storeId: process.env.CLIENT_ID
    
    };
    const signature = amazonPay.webstoreClient.generateButtonSignature(payload);
    console.log("buttonSignature created");
    res.json({
        payloadJSON: payload,
        signature: signature
    });
});

app.post("/setCheckoutSessionId", jsonParser, (req, res) => {
    
  console.log("set checkoutSession called"+ JSON.stringify(req.body));
  req.session.checkoutSessionId = req.body.checkoutSessionId
  
  res.send({})
  
});

app.get("/getCheckoutSession", async (req, res) => {
    
    console.log("getCheckoutSession API called");
    try{
      response = await checkoutSessionManager.getCheckoutSession(req.session.checkoutSessionId, amazonPay.webstoreClient)
      res.json(response.data)
    } catch(err) {
      console.error(err);
      res.status(500);
    };
});

app.get("/updateCheckoutSession", async (req, res) => {
  console.log("updateCheckoutSession API called");
  try{
    response = await checkoutSessionManager.updateCheckoutSession(req.session.checkoutSessionId, amazonPay.webstoreClient)
    res.json(response.data)
  } catch(err) {
    console.error(err);
    res.status(500);
  };
});

app.get("/completeCheckoutSession", async (req, res) => {
  
  console.log("completeCheckoutSession API called");
  try{
    response = await checkoutSessionManager.completeCheckoutSession(req.session.checkoutSessionId, amazonPay.webstoreClient)
    //saving chargePermission and ChargeId in session
    req.session.chargePermissionId = response.data.chargePermissionId;
    req.session.chargeId = response.data.chargeId;
    res.send(response.data);
  } catch(err) {
    console.error(err);
    res.status(500);
  };
    
});

app.get('/getChargePermission', async (req, res) => {
    try{
      response = await amazonPay.webstoreClient.getChargePermission(req.session.chargePermissionId)
      res.send(response.data);
    } catch(err) {
      console.log(err);
      res.send(err.response.data);
    };
});

app.get('/getCharge', async (req, res) => {
    try{
      response = await amazonPay.webstoreClient.getCharge(req.session.chargeId)
      res.send(response.data);
    } catch(err){
      console.log(err);
      res.send(err.response.data);
    };
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
