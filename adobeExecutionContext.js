const PDFServicesSdk = require("@adobe/pdfservices-node-sdk");
const config = require('config');
const connectTimeout = config.get('adobeClientConfig.connectTimeout');
const readTimeout = config.get('adobeClientConfig.readTimeout');
const credentialsFilePath = config.get('adobeClientConfig.credentialsFilePath');

class Adobe {
    static getAdobeExecutionContext() {
        const clientConfig = PDFServicesSdk.ClientConfig
            .clientConfigBuilder()
            .withConnectTimeout(connectTimeout)
            .withReadTimeout(readTimeout)
            .build();

        const credentials = PDFServicesSdk.Credentials.serviceAccountCredentialsBuilder()
            .fromFile(credentialsFilePath)
            .build();

        return PDFServicesSdk.ExecutionContext.create(credentials, clientConfig);
    }
}
module.exports = Adobe
