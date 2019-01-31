var config = {
    testLocalAssetManagement: {
        driver: 'msnodesqlv8',
        connectionString: 'Driver={SQL Server Native Client 11.0};Server={localhost\\SQLEXPRESS01};Database={LocalAssetManagement};Trusted_Connection={yes};'
    },
    test02tAssetManagement: {
        driver: 'msnodesqlv8',
        connectionString: 'Driver={SQL Server Native Client 11.0};Server={HQOLYMBRGSQL02T};Database={AssetManagement};Trusted_Connection={yes};'
    },
    prod02pBridgeData: {
        driver: 'msnodesqlv8',
        connectionString: 'Driver={SQL Server Native Client 11.0};Server={HQOLYMBRGSQL02P};Database={BridgeData};Trusted_Connection={yes};'
    }
};
module.exports = config;