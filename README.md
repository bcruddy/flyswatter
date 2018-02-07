# flyswatter [![npm version](https://badge.fury.io/js/flyswatter.svg)](https://badge.fury.io/js/flyswatter)

Simple static file server built on express.

## cli usage

Install globally to run `flyswatter` and serve static files from anywhere.

    $ flyswatter --https=false --port=9300 --path=./docs

## programatic usage

    const flyswatter = require('flyswatter');
    flyswatter({https: false, path: './docs'}).then(server => {
        server.listen(9300, callback);
    });

_*note the `port` config option must be provided explicitly to `server.listen`_

## config
| parameter   | default     |
| ----------- | ----------- |
| `https`     | `true`      |
| `port`      | `3000`      |
| `path`      | `./`        |
