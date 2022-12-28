module.exports = {
    getChargePermission: (chargePermissionId) => {
        const fs = require('fs');
const uuidv4 = require('uuid/v4');
const Client = require('@amazonpay/amazon-pay-api-sdk-nodejs');
        const config = {
            publicKeyId: process.env.PUBLIC_KEY,
            privateKey: fs.readFileSync(process.env.PRIVATE_KEY),
            region: process.env.REGION,
            sandbox: true
        };
        const testPayClient = new Client.WebStoreClient(config);

        response = testPayClient.getChargePermission(chargePermissionId)

        return Promise.resolve(response);
    
}
}