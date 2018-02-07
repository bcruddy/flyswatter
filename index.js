#!/usr/bin/env node

const argv = require('yargs').argv,
    server = require('./lib/server'),
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
    console.error('Encountered an issue parsing arguments');
    throw ex;
}

server(config)
    .then(server => listen(server, config));
