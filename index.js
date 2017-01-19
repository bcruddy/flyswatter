#!/usr/bin/env node

const argv = require('yargs').argv,
    server = require('./server');

server(argv.path, argv.port);
