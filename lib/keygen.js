const pem = require('pem'),
    logger = require('./logger');

module.exports = () => new Promise((resolve, reject) => {
    logger.info('generating self signed certificate...');
    pem.createCertificate({days: 1, selfSigned: true}, (err, keys) => {
        if (err) {
            err.known = true;
            logger.error('error generating certificates');
            return reject(err);
        }

        logger.info('certificates generated successfully');
        resolve({key: keys.serviceKey, cert: keys.certificate});
    });
});
