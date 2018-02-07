#!/usr/bin/env node

const argv = require('yargs').argv,
    server = require('./server');
const config = Object.assign({}, {
    path: './',
    port: 3000,
    https: true
}, {...argv});

server(config);
