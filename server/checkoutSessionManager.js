const uuidv4 = require('uuid/v4');
module.exports = {
    getCheckoutSession: (checkoutSessionId, webstoreClient) => {

        const headers = {
            'x-amz-pay-idempotency-key': uuidv4().toString().replace(/-/g, '')
        };
        response = webstoreClient.getCheckoutSession(checkoutSessionId, headers)
        
        return Promise.resolve(response);
    },
    updateCheckoutSession: (checkoutSessionId, webstoreClient) => {
        const payload = {
            webCheckoutDetails: {
                checkoutResultReturnUrl: 'http://localhost:'+process.env.PORT+'/checkoutReturn'
            },
            paymentDetails: {
                paymentIntent: 'Authorize',
                canHandlePendingAuthorization: true,
                chargeAmount: {
                    amount: 30,             //Amount to be charged
                    currencyCode: 'USD'
                }
            },
            merchantMetadata: {
                merchantReferenceId: 'A12345',
                merchantStoreName: 'Furniture Store',
                noteToBuyer: 'Thank you for purchasing!',
                customInformation: ''
            }
        };

        response = webstoreClient.updateCheckoutSession(checkoutSessionId, payload)
        
        return Promise.resolve(response);
    },
    completeCheckoutSession: (checkoutSessionId, webstoreClient) => {

        const payload = {
            chargeAmount: {
                amount: 30.00,
                currencyCode: "USD"
            }
        }
        ;
        response = webstoreClient.completeCheckoutSession(checkoutSessionId, payload)
        return Promise.resolve(response);
    }
}