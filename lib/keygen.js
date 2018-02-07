const pem = require('pem');

module.exports = () => new Promise((resolve, reject) => {
    console.log('[flyswatter] generating self signed certificate...');
    pem.createCertificate({days: 1, selfSigned: true}, (err, keys) => {
        if (err) {
            return reject(err);
        }

        resolve({key: keys.serviceKey, cert: keys.certificate});
    });
});
