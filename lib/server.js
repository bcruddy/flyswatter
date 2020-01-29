const http = require('http'),
    https = require('https'),
    express = require('express'),
    proxy = require('./proxy'),
    keygen = require('./keygen');

module.exports = config => new Promise((resolve, reject) => {
    const app = express();
    if (config.proxy) {
        proxy(config, app);
    }

    app.use(express.static(config.path));

    if (config.https) {
        keygen()
            .then(credentials => {
                const server = https.createServer(credentials, app);

                resolve(server);
            })
            .catch(err => {
                reject(err);
            });
    } else {
        const server = http.createServer(app);
        resolve(server);
    }
});
