const logger = require('./logger'),
    fetch = require('node-fetch'),
    bodyParser = require('body-parser');

module.exports = (config, app) => {
    if (!config.proxy) {
        return;
    }

    logger.info('configuring proxy...');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    Object.entries(config.proxy).forEach(([route, url]) => {
        app.use(route, (req, res) => {
            const endpoint = url + req.url;
            const fetchConfig = {
                headers: req.headers,
                method: req.method
            };

            if (!isEmpty(req.body)) {
                fetchConfig.body = JSON.stringify(req.body);
            }

            fetch(endpoint, fetchConfig)
                .then(r => r.json())
                .then(json => {
                    res.json(json);
                })
                .catch(err => {
                    res.status(err.status || 500).send(err && err.message || '[flyswatter] unknown error');
                });
        });
    });

    logger.info('proxy configured successfully');
};

function isEmpty (obj) {
    return !obj || Object.keys(obj).length === 0;
}
