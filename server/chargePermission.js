module.exports = {
    getChargePermission: (chargePermissionId, webstoreClient) => {
        response = webstoreClient.getChargePermission(chargePermissionId)

    return Promise.resolve(response);
  },
};
