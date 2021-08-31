import { expect } from 'chai';

describe('operations with numbers', function() {
    const a = 5;
    const b = 7;

    it('addition works correctly', function() {
        expect(a + b, 'result should equal 12').to.eq(12);
    });

    it('subtraction works correctly', function() {
        expect(a - b, 'result should equal -2').to.eq(-2);
    });
});