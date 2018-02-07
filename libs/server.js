const http = require('http'),
    https = require('https'),
    express = require('express'),
    keygen = require('./keygen'),
    listen = require('./listen');

module.exports = function server (config) {
    const app = express(),
        {path, https: isHttps} = config;
    
    app.use(express.static(path));

    let server;
    if (isHttps) {
        keygen()
            .then(credentials => {
                server = https.createServer(credentials, app);
                listen(server, config);
            })
            .catch(err => {
                console.error(err);
            });
    } else {
        server = http.createServer(app);
        listen(server, config);
    }
};
