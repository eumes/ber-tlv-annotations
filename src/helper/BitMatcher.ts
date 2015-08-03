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

import { OctetBuffer } from 'octet-buffer';

export class BitMatcher {

    static matches(reference: string, bitmatch: string): boolean {
        reference = reference.replace(/\s/g, '').toLowerCase();
        bitmatch = bitmatch.replace(/\s/g, '').toLowerCase();

        var matches: boolean;
        if (bitmatch.indexOf('&') > -1){
            matches = BitMatcher.matchesBitmask(reference, bitmatch);
        }
        else if (bitmatch.indexOf('=') > -1){
            matches = BitMatcher.matchesBitpattern(reference, bitmatch);
        }
        else {
            matches = BitMatcher.matchesPattern(reference, bitmatch);
        }
        return matches;
    };


    private static matchesPattern(reference: string, pattern: string): boolean {
        var matches: boolean = reference === pattern;
        return matches;
    }

    //reference expected to be 'hex'
    private static matchesBitmask(reference: string, bitmask: string): boolean {
        var bitmaskComponents: string[] = bitmask.split('&');
        var selectedByte: number = parseInt(bitmaskComponents[0]);
        var selectedBitmask: string = bitmaskComponents[1];

        var referencedByteIndex: number = selectedByte - 1;
        var referencedByteIndexInString: number = referencedByteIndex * 2;
        var referencedByteString: string = reference.substring(referencedByteIndexInString, referencedByteIndexInString + 2);

        var referencedByte: number = parseInt(referencedByteString, 16);
        var bitmaskByte: number = BitMatcher.generateBitmask(selectedBitmask);

        var matches: boolean = ((referencedByte & bitmaskByte) === bitmaskByte);
        return matches;
    }

    private static generateBitmask(bitmask: string): number {
        var generatedBitmask: number;
        if (bitmask.length === 1){
            var bit: number = parseInt(bitmask, 10) - 1;
            generatedBitmask = 0x01 << bit;
        }
        else if (bitmask.length === 2){
            generatedBitmask = parseInt(bitmask, 16);
        }
        else {
            generatedBitmask = parseInt(bitmask, 2);
        }
        return generatedBitmask;
    }

    //reference expected to be 'bits'
    private static matchesBitpattern(reference: string, bitpattern: string): boolean {
        var bitpatternComponents: string[] = bitpattern.split('=');
        var selectedByte: number = parseInt(bitpatternComponents[0]);
        var selectedBitpattern: string = bitpatternComponents[1];

        var referencedBitpatternIndex: number = selectedByte - 1;
        var referencedBitpatternIndexInString: number = referencedBitpatternIndex * 8;
        var referencedBitpattern: string = reference.substring(referencedBitpatternIndexInString, referencedBitpatternIndexInString + 8);

        if (selectedBitpattern.length !== referencedBitpattern.length){
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
    }
}
