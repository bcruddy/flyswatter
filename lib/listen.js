const logger = require('./logger');

module.exports = (server, {port, https: isHttps}) => {
    server.listen(port, () => {
        const protocol = isHttps ? 'https' : 'http';
        logger.info(`listening on ${protocol}://localhost:${port}`);
    });
};
