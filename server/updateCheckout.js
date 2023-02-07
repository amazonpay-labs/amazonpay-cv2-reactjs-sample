module.exports = {
  updateCheckoutSession: (checkoutSessionId) => {
    const fs = require('fs');
    const uuidv4 = require('uuid/v4');
    const Client = require('@amazonpay/amazon-pay-api-sdk-nodejs');
    const config = {
      publicKeyId: process.env.PUBLIC_KEY_ID,
      privateKey: fs.readFileSync(process.env.PRIVATE_KEY),
      region: process.env.REGION,
      sandbox: true,
    };

    const testPayClient = new Client.WebStoreClient(config);
    const payload = {
      webCheckoutDetails: {
        checkoutResultReturnUrl:
          'http://localhost:' + process.env.PORT + '/checkoutReturn',
      },
      paymentDetails: {
        paymentIntent: 'Authorize',
        canHandlePendingAuthorization: false,
        chargeAmount: {
          amount: 1000, //Amount to be charged
          currencyCode: process.env.CURRENCY_CODE,
        },
      },
      merchantMetadata: {
        merchantReferenceId: uuidv4().toString().replace(/-/g, ''),
        merchantStoreName: 'Furniture Store',
        noteToBuyer: 'Thank you for purchasing!',
        customInformation: '',
      },
    };

    response = testPayClient.updateCheckoutSession(checkoutSessionId, payload);

    return Promise.resolve(response);
  },
};
