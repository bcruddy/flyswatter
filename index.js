#!/usr/bin/env node

const argv = require('yargs').argv,
    server = require('./lib/server'),
    logger = require('./lib/logger'),
    getConfig = require('./lib/config'),
    listen = require('./lib/listen');
const defaultConfig = {
        path: './',
        port: 3000,
        https: true
    },
    configFromFile = getConfig(argv.config),
    config = Object.assign({}, defaultConfig, configFromFile, argv);

logger.info('config parsed successfully');

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
        !err.known && logger.error('unexpected error\n');
        throw err;
    });
