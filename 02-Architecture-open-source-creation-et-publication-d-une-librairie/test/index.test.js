const { expect } = require('chai');
const { validateEnv } = require('../src/index');

describe('validateEnv', () => {
    beforeEach(() => {
        delete process.env.TEST_VAR;
        delete process.env.NUM_VAR;
        delete process.env.BOOL_VAR;
    });

    it('should throw an error if a required variable is missing', () => {
        const schema = [{ name: 'TEST_VAR', required: true, type: 'string' }];
        expect(() => validateEnv(schema)).to.throw('Missing required env var: TEST_VAR');
    });

    it('should throw an error if the number type is invalid', () => {
        process.env.NUM_VAR = 'not-a-number';
        const schema = [{ name: 'NUM_VAR', required: true, type: 'number' }];
        expect(() => validateEnv(schema)).to.throw('Env var NUM_VAR is not a valid number');
    });

    it('should throw an error if the boolean type is invalid', () => {
        process.env.BOOL_VAR = 'maybe';
        const schema = [{ name: 'BOOL_VAR', required: true, type: 'boolean' }];
        expect(() => validateEnv(schema)).to.throw('Env var BOOL_VAR is not a valid boolean');
    });

    it('should throw an error if the regex does not match', () => {
        process.env.TEST_VAR = '123';
        const schema = [{ name: 'TEST_VAR', required: true, type: 'string', regex: '^\\d{4}$' }];
        expect(() => validateEnv(schema)).to.throw('Env var TEST_VAR does not match pattern ^\\\\d{4}$');
    });

    it('should not throw an error for valid variables', () => {
        process.env.NUM_VAR = '42';
        process.env.BOOL_VAR = 'true';
        process.env.TEST_VAR = 'abcd';
        const schema = [
            { name: 'NUM_VAR', required: true, type: 'number' },
            { name: 'BOOL_VAR', required: true, type: 'boolean' },
            { name: 'TEST_VAR', required: true, type: 'string', regex: '^[a-z]+$' }
        ];
        expect(() => validateEnv(schema)).to.not.throw();
    });
});
