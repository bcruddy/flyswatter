const server = require('./server');

describe('server', () => {
    it('has a test', () => {
        expect(typeof server).toBe('function');
    });
});
