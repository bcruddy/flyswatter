const getConfig = require('./config'),
    config = require('../flyswatter.config'),
    logger = require('./logger');

describe('config', () => {
    let infoSpy;

    beforeEach(() => {
        infoSpy = jest.spyOn(logger, 'info');
    });

    afterEach(() => {
        infoSpy.mockRestore();
        infoSpy.mockReset();
    });

    it('returns an empty object if the given file doesnt exist', () => {
        expect(getConfig('./not/a/config')).toEqual({});
        expect(infoSpy).toHaveBeenCalledTimes(0);
    });

    it('returns config from default location', () => {
        expect(getConfig()).toEqual(config);
        expect(infoSpy).toHaveBeenCalledTimes(1);
    });

    it('returns config from given location', () => {
        expect(getConfig('flyswatter.config.js')).toEqual(config);
        expect(infoSpy).toHaveBeenCalledTimes(1);
    });
});
