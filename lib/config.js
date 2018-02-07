const fs = require('fs'),
    {resolve} = require('path'),
    logger = require('./logger');

module.exports = (path = './flyswatter.config.js') => {
    const configPath = resolve(process.cwd(), path);
    if (!fs.existsSync(configPath)) {
        return {};
    }

    logger.info('parsing config file...');
    return require(configPath);
};
