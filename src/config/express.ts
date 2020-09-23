export default {

    environment: process.env.EXPRESS_ENVIRONMENT,
    port: process.env.EXPRESS_PORT,
    host: process.env.EXPRESS_HOST,
    protocol: process.env.EXPRESS_PROTOCOL,

    // helpers
    isProduction() {
        return this.get('express.environment') === 'production';
    },

    isLocal() {
      return this.get('express.environment') === 'local';
    },

    baseUrl() {
        let portSegment = this.get('express.port') ? ':' + this.get('express.port') : '';
        return this.get('express.protocol') + '://' + this.get('express.host') + portSegment;
    }
}
