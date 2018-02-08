// const fetch = jest.mock('node-fetch');
const express = require('express'),
    proxy = require('./proxy');
    // request = require('supertest');

describe('proxy', () => {
    let app;
    let config;
    let appUseSpy;

    beforeEach(() => {
        config = {
            proxy: {
                '/api': 'https://foo.bar'
            }
        };
        app = express();
        appUseSpy = jest.spyOn(app, 'use');
    });

    afterEach(() => {
        [appUseSpy].forEach((mock) => {
            mock.mockReset();
            mock.mockRestore();
        });
    });

    afterAll(() => {
        jest.unmock('node-fetch');
    });

    describe('setup', () => {
        it('returns undefined when config.proxy is falsy', () => {
            const shouldBeUndef = proxy({}, {});

            expect(shouldBeUndef).toBeUndefined();
        });

        it('sets routes on the given express application', () => {
            proxy(config, app);

            expect(appUseSpy.mock.calls[2][0]).toBe('/api');
        });
    });

    describe.skip('request handler', () => {
        // we need to mock node-fetch here and check that its called
        // with the correct arguments
        beforeEach(() => {
            proxy(config, app);
        });

        it('HEAD', () => {});

        it('GET', () => {});

        it('PUT', () => {});

        it('POST', () => {});

        it('DELETE', () => {});
    });
});
