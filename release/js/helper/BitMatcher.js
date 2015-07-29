//TODO: add support for using this format in the ByteHelper
/**
    Pattern:

"pattern": "05",			--> '<value>',				'05'
"bitmask": "0080",			--> '<byte>&<bitmask>',		'2&80'		-or- '2&10000000'	-or- '2&8'
"bitpattern": "xx000011",  	--> '<byte>=<bytemask>', 	'1=--000011'
"bitpattern": "x0xxxxxx",  								'1=-0------'
"bitpattern": "00000000 xx000000",						'2=--000000'

<byte> == <number>
<bitmask>    == <number:2> hex, <number:8> bits, <number:1> bit
<bytemask>   == <<bitpattern>:8>
<bitpattern> == '-' ignore, '1'|'0' value

*/
var BitMatcher = (function () {
    function BitMatcher() {
    }
    BitMatcher.matches = function (reference, bitmatch) {
        reference = reference.replace(/\s/g, '').toLowerCase();
        bitmatch = bitmatch.replace(/\s/g, '').toLowerCase();
        var matches;
        if (bitmatch.indexOf('&') > -1) {
            matches = BitMatcher.matchesBitmask(reference, bitmatch);
        }
        else if (bitmatch.indexOf('=') > -1) {
            matches = BitMatcher.matchesBitpattern(reference, bitmatch);
        }
        else {
            matches = BitMatcher.matchesPattern(reference, bitmatch);
        }
        return matches;
    };
    ;
    BitMatcher.matchesPattern = function (reference, pattern) {
        var matches = reference === pattern;
        return matches;
    };
    BitMatcher.matchesBitmask = function (reference, bitmask) {
        var bitmaskComponents = bitmask.split('&');
        var selectedByte = parseInt(bitmaskComponents[0]);
        var selectedBitmask = bitmaskComponents[1];
        var referencedByteIndex = selectedByte - 1;
        var referencedByteIndexInString = referencedByteIndex * 2;
        var referencedByteString = reference.substring(referencedByteIndexInString, referencedByteIndexInString + 2);
        var referencedByte = parseInt(referencedByteString, 16);
        var bitmaskByte = BitMatcher.generateBitmask(selectedBitmask);
        var matches = ((referencedByte & bitmaskByte) === bitmaskByte);
        return matches;
    };
    BitMatcher.generateBitmask = function (bitmask) {
        var generatedBitmask;
        if (bitmask.length === 1) {
            var bit = parseInt(bitmask, 10) - 1;
            generatedBitmask = 0x01 << bit;
        }
        else if (bitmask.length === 2) {
            generatedBitmask = parseInt(bitmask, 16);
        }
        else {
            generatedBitmask = parseInt(bitmask, 2);
        }
        return generatedBitmask;
    };
    BitMatcher.matchesBitpattern = function (reference, bitpattern) {
        var bitpatternComponents = bitpattern.split('=');
        var selectedByte = parseInt(bitpatternComponents[0]);
        var selectedBitpattern = bitpatternComponents[1];
        var referencedBitpatternIndex = selectedByte - 1;
        var referencedBitpatternIndexInString = referencedBitpatternIndex * 8;
        var referencedBitpattern = reference.substring(referencedBitpatternIndexInString, referencedBitpatternIndexInString + 8);
        if (selectedBitpattern.length !== referencedBitpattern.length) {
            return false;
        }
        for (var i = 0; i < selectedBitpattern.length; i++) {
            var bitpatternBit = selectedBitpattern.charAt(i);
            if (bitpatternBit === 'x' || bitpatternBit === '-' || bitpatternBit === '_') {
                continue;
            }
            var referenceBit = referencedBitpattern.charAt(i);
            if (referenceBit !== bitpatternBit) {
                return false;
            }
        }
        return true;
    };
    return BitMatcher;
})();
exports.BitMatcher = BitMatcher;
