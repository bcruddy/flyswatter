const http = require('http'),
    https = require('https'),
    express = require('express'),
    keygen = require('./keygen');

module.exports = function server (config) {
    return new Promise((resolve, reject) => {
        const app = express(),
            {path, https: isHttps} = config;

        app.use(express.static(path));

        let server;
        if (isHttps) {
            keygen()
                .then(credentials => {
                    server = https.createServer(credentials, app);

                    resolve(server);
                })
                .catch(err => {
                    reject(err);
                });
        } else {
            server = http.createServer(app);
            resolve(server);
        }
    });
};
