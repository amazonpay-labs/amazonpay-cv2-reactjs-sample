module.exports = {
    getCharge: (chargeId, webstoreClient) => {
       
        response = webstoreClient.getCharge(chargeId)
        return Promise.resolve(response);
    }
}
