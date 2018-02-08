const getConfig = require('./config');

describe('config', () => {
    it('has a test', () => {
        expect(typeof getConfig).toBe('function');
    });
});
