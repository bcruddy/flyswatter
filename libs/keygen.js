const pem = require('pem');

module.exports = () => new Promise((resolve, reject) => {
    pem.createCertificate({days: 1, selfSigned: true}, function (err, keys) {
        if (err) {
            reject(err);
        }

        resolve({key: keys.serviceKey, cert: keys.certificate});
    });
});
