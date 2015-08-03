//TODO: add support for using this format in the ByteHelper
/**
    Pattern:

"pattern": "05",			--> '<value>',				'05'
"bitmask": "0080",			--> '<byte>&<bitmask>',		'2&80'		-or- '2&10000000'	-or- '2&7'
"bitpattern": "xx000011",  	--> '<byte>=<bytemask>', 	'1=--000011'
"bitpattern": "x0xxxxxx",  								'1=-0------'
"bitpattern": "00000000 xx000000",						'2=--000000'

<byte> == <number>
<bitmask>    == <number:2> hex, <number:8> bits, <number:1> bit
<bytemask>   == <<bitpattern>:8>
<bitpattern> == '-' ignore, '1'|'0' value

*/
var chai_1 = require('chai');
var BitMatcher_1 = require('./BitMatcher');
describe('BitMatcher', function () {
    var reference;
    var bitmatch;
    var expectingMatch;
    var receivedMatch;
    beforeEach(function () {
        reference = null;
        bitmatch = null;
        expectingMatch = false;
        receivedMatch = false;
    });
    describe('#matches', function () {
        describe('<pattern>', function () {
            it('accepts matching empty <value>', function () {
                reference = "";
                bitmatch = "";
                expectingMatch = true;
                receivedMatch = BitMatcher_1.BitMatcher.matches(reference, bitmatch);
                chai_1.expect(receivedMatch).to.equal(expectingMatch);
            });
            it('rejects mismatching length <value>', function () {
                reference = "1";
                bitmatch = "AF";
                expectingMatch = false;
                receivedMatch = BitMatcher_1.BitMatcher.matches(reference, bitmatch);
                chai_1.expect(receivedMatch).to.equal(expectingMatch);
            });
            it('accepts matching single <value>', function () {
                reference = "0";
                bitmatch = "0";
                expectingMatch = true;
                receivedMatch = BitMatcher_1.BitMatcher.matches(reference, bitmatch);
                chai_1.expect(receivedMatch).to.equal(expectingMatch);
            });
            it('rejects not matching single <value>', function () {
                reference = "0";
                bitmatch = "1";
                expectingMatch = false;
                receivedMatch = BitMatcher_1.BitMatcher.matches(reference, bitmatch);
                chai_1.expect(receivedMatch).to.equal(expectingMatch);
            });
            it('accepts matching multi <value>', function () {
                reference = "011245AF";
                bitmatch = "011245AF";
                expectingMatch = true;
                receivedMatch = BitMatcher_1.BitMatcher.matches(reference, bitmatch);
                chai_1.expect(receivedMatch).to.equal(expectingMatch);
            });
            it('rejects not matching multi <value>', function () {
                reference = "011245AF";
                bitmatch = "111245AF";
                expectingMatch = false;
                receivedMatch = BitMatcher_1.BitMatcher.matches(reference, bitmatch);
                chai_1.expect(receivedMatch).to.equal(expectingMatch);
            });
        });
        describe('<bitmask> (&)', function () {
            describe('using format _&__ (hex)', function () {
                it('accepts matching 1st byte', function () {
                    reference = "41";
                    bitmatch = "1&41";
                    expectingMatch = true;
                    receivedMatch = BitMatcher_1.BitMatcher.matches(reference, bitmatch);
                    chai_1.expect(receivedMatch).to.equal(expectingMatch);
                });
                it('rejects not matching 1st byte', function () {
                    reference = "40";
                    bitmatch = "1&41";
                    expectingMatch = false;
                    receivedMatch = BitMatcher_1.BitMatcher.matches(reference, bitmatch);
                    chai_1.expect(receivedMatch).to.equal(expectingMatch);
                });
                it('accepts matching 2nd byte', function () {
                    reference = "4128";
                    bitmatch = "2&28";
                    expectingMatch = true;
                    receivedMatch = BitMatcher_1.BitMatcher.matches(reference, bitmatch);
                    chai_1.expect(receivedMatch).to.equal(expectingMatch);
                });
                it('reject not matching 2nd byte', function () {
                    reference = "4100";
                    bitmatch = "2&28";
                    expectingMatch = false;
                    receivedMatch = BitMatcher_1.BitMatcher.matches(reference, bitmatch);
                    chai_1.expect(receivedMatch).to.equal(expectingMatch);
                });
            });
            describe('using format _&_ (bitnumber)', function () {
                it('accepts matching 1st byte', function () {
                    reference = "41";
                    bitmatch = "1&1";
                    expectingMatch = true;
                    receivedMatch = BitMatcher_1.BitMatcher.matches(reference, bitmatch);
                    chai_1.expect(receivedMatch).to.equal(expectingMatch);
                });
                it('rejects not matching 1st byte', function () {
                    reference = "40";
                    bitmatch = "1&1";
                    expectingMatch = false;
                    receivedMatch = BitMatcher_1.BitMatcher.matches(reference, bitmatch);
                    chai_1.expect(receivedMatch).to.equal(expectingMatch);
                });
                it('accepts matching 2nd byte', function () {
                    reference = "4128";
                    bitmatch = "2&4";
                    expectingMatch = true;
                    receivedMatch = BitMatcher_1.BitMatcher.matches(reference, bitmatch);
                    chai_1.expect(receivedMatch).to.equal(expectingMatch);
                });
                it('reject not matching 2nd byte', function () {
                    reference = "4100";
                    bitmatch = "2&3";
                    expectingMatch = false;
                    receivedMatch = BitMatcher_1.BitMatcher.matches(reference, bitmatch);
                    chai_1.expect(receivedMatch).to.equal(expectingMatch);
                });
            });
            describe('using format _&________ (bitsetting)', function () {
                it('accepts matching 1st byte', function () {
                    reference = "41";
                    bitmatch = "1&00000001";
                    expectingMatch = true;
                    receivedMatch = BitMatcher_1.BitMatcher.matches(reference, bitmatch);
                    chai_1.expect(receivedMatch).to.equal(expectingMatch);
                });
                it('rejects not matching 1st byte', function () {
                    reference = "40";
                    bitmatch = "1&00000001";
                    expectingMatch = false;
                    receivedMatch = BitMatcher_1.BitMatcher.matches(reference, bitmatch);
                    chai_1.expect(receivedMatch).to.equal(expectingMatch);
                });
                it('accepts matching 2nd byte', function () {
                    reference = "4128";
                    bitmatch = "2&00001000";
                    expectingMatch = true;
                    receivedMatch = BitMatcher_1.BitMatcher.matches(reference, bitmatch);
                    chai_1.expect(receivedMatch).to.equal(expectingMatch);
                });
                it('reject not matching 2nd byte', function () {
                    reference = "4100";
                    bitmatch = "2&10001100";
                    expectingMatch = false;
                    receivedMatch = BitMatcher_1.BitMatcher.matches(reference, bitmatch);
                    chai_1.expect(receivedMatch).to.equal(expectingMatch);
                });
            });
        });
        describe('<bitpattern> (=)', function () {
            describe('using format _=________ (bitsetting)', function () {
                it('accepts matching 1st byte', function () {
                    reference = "01010101";
                    bitmatch = "1=-------1";
                    expectingMatch = true;
                    receivedMatch = BitMatcher_1.BitMatcher.matches(reference, bitmatch);
                    chai_1.expect(receivedMatch).to.equal(expectingMatch);
                });
                it('rejects not matching 1st byte', function () {
                    reference = "01010101";
                    bitmatch = "1=11110000";
                    expectingMatch = false;
                    receivedMatch = BitMatcher_1.BitMatcher.matches(reference, bitmatch);
                    chai_1.expect(receivedMatch).to.equal(expectingMatch);
                });
                it('accepts matching 2nd byte', function () {
                    reference = "01010101 00100011";
                    bitmatch = "2=00-00011";
                    expectingMatch = true;
                    receivedMatch = BitMatcher_1.BitMatcher.matches(reference, bitmatch);
                    chai_1.expect(receivedMatch).to.equal(expectingMatch);
                });
                it('reject not matching 2nd byte', function () {
                    reference = "01010101 00001111";
                    bitmatch = "2=11110000";
                    expectingMatch = false;
                    receivedMatch = BitMatcher_1.BitMatcher.matches(reference, bitmatch);
                    chai_1.expect(receivedMatch).to.equal(expectingMatch);
                });
            });
        });
    });
});
