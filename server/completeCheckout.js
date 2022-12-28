module.exports = {
    completeCheckoutSession: (checkoutSessionId) => {
        const fs = require('fs');
const uuidv4 = require('uuid/v4');
const Client = require('@amazonpay/amazon-pay-api-sdk-nodejs');
        const config = {
            publicKeyId: process.env.PUBLIC_KEY,
            privateKey: fs.readFileSync(process.env.PRIVATE_KEY),
            region: 'us',
            sandbox: true
        };
        const testPayClient = new Client.WebStoreClient(config);
        const payload = {
            chargeAmount: {
                amount: 30.00,
                currencyCode: "USD"
            }
        }
        ;
        response = testPayClient.completeCheckoutSession(checkoutSessionId, payload)
        return Promise.resolve(response);
    
}
}
