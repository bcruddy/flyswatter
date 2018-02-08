const pem = require('pem'),
    keygen = require('./keygen');

describe('keygen', () => {
    beforeEach(() => {
        jest.spyOn(pem, 'createCertificate');
    });

    it('calls create certificate', () => {
        keygen();
        expect(pem.createCertificate).toBeCalled();
    });
});
