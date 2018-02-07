#!/usr/bin/env node

const argv = require('yargs').argv,
    server = require('./lib/server'),
    logger = require('./lib/logger'),
    listen = require('./lib/listen');
const config = Object.assign({}, {
    path: './',
    port: 3000,
    https: true
}, argv);

try {
    // cli args all come in as strings, we need these types to be correct
    config.https = JSON.parse(config.https);
    config.port = JSON.parse(config.port);
} catch (ex) {
    logger.error('encountered an issue parsing arguments\n');
    throw ex;
}

server(config)
    .then(server => listen(server, config))
    .catch(err => {
        !err.known && logger.error('unknown error\n');
        throw err;
    });
