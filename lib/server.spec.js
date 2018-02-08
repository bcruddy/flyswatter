jest.mock('./keygen');
jest.mock('./proxy');

const server = require('./server'),
    keygen = require('./keygen'),
    proxy = require('./proxy');

describe('server', () => {
    let config;

    beforeEach(() => {
        config = {
            https: true,
            proxy: {},
            path: './'
        };
    });

    afterEach(() => {
        [proxy, keygen].forEach(mock => {
            mock.mockReset();
            mock.mockClear();
        });
    });

    afterAll(() => {
        jest.unmock('./keygen');
        jest.unmock('./proxy');
    });

    describe('proxy', () => {
        it('sets up proxy', () => {
            server(config);
            expect(proxy).toHaveBeenCalled();
        });

        it('skips proxy when not configured', () => {
            delete config.proxy;

            server(config);
            expect(proxy).not.toHaveBeenCalled();
        });
    });

    describe('keygen', () => {
        it('generates certs for https', () => {
            server(config);
            expect(keygen).toHaveBeenCalled();
        });

        it('skips keygen when not configured', () => {
            config.https = false;

            server(config);
            expect(keygen).not.toHaveBeenCalled();
        });
    });
});
