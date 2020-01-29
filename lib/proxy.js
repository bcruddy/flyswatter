const _ = require('lodash'),
    axios = require('axios'),
    bodyParser = require('body-parser'),
    logger = require('./logger');

module.exports = (config, app) => {
    if (!config.proxy) {
        return;
    }

    logger.info(`configuring proxy on ${config.port}`);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    Object.entries(config.proxy).forEach(([route, baseUrl]) => {
        logger.info(`set up proxy for ${route} -> ${baseUrl}`);
        app.use(route, (req, res) => {
            const {
                headers,
                method,
                body: data,
                query: params,
                url: pathname
            } = req;
            const reqConfig = {
                data,
                headers,
                method,
                params,
                url: baseUrl + pathname
            };

            axios(reqConfig)
                .then(({data, headers, status}) => {
                    const cookies = parseAxiosCookies(headers['set-cookie']);

                    cookies.forEach(cookie => {
                        res.cookie(cookie.name, cookie.value, cookie.options);
                    });

                    res.status(status).send(data).end();
                })
                .catch(err => {
                    res.status(err.status || 500).send('failed').end();
                    logger.info(err);
                });
        });
    });
};

function parseAxiosCookies (setCookie) {
    return setCookie.map((cookie) => {
        const [kv, ...config] = cookie.split(';');
        const [name, value] = kv.split('=');

        return {
            name,
            value,
            options: config.reduce((map, option) => {
                const [key, value] = option.trim().split('=');

                map[_.camelCase(key)] = value || true;

                return map;
            }, {})
        };
    });
}
