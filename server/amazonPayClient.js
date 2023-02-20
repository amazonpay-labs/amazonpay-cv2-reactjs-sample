class AmazonPayClient {
    constructor() {
        const Client = require('@amazonpay/amazon-pay-api-sdk-nodejs');
        const fs = require('fs');
        let config = {
            publicKeyId: process.env.PUBLIC_KEY,
            privateKey: fs.readFileSync(process.env.PRIVATE_KEY),
            region: process.env.REGION,
            sandbox: true
        };

        this.amazonpayClient = new Client.AmazonPayClient(config);
        this.webstoreClient = new Client.WebStoreClient(config);
    }
}

module.exports = AmazonPayClient;