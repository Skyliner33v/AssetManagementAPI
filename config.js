var config = {
    testLocalAssetManagement: {
        driver: 'msnodesqlv8',
        connectionString: 'Driver={SQL Server Native Client 11.0};Server={localhost\\SQLEXPRESS01};Database={LocalAssetManagement};Trusted_Connection={yes};'
    },
    test02tAssetManagement: {
        driver: 'msnodesqlv8',
        connectionString: 'Driver={SQL Server Native Client 11.0};Server={HQOLYMBRGSL202T};Database={AssetManagement};Trusted_Connection={yes};'
    },
    prod02pBridgeData: {
        driver: 'msnodesqlv8',
        connectionString: 'Driver={SQL Server Native Client 11.0};Server={HQOLYMBRGSL202P};Database={BridgeData};Trusted_Connection={yes};'
    }
};
module.exports = config;