var currencyLookup = require('country-data').lookup;
var countryLookup =  require('i18n-iso-countries');

import { OctetBuffer } from 'octet-buffer';
import { ByteHelper } from './ByteHelper';

export enum AnnotationValueFormat {
    ALPHABETIC,           // Ascii [a-zA-Z]
    ALPHANUMERIC,         // Ascii [a-zA-Z0-9]
    ALPHANUMERIC_SPECIAL, // Ascii (all)
    UNSIGNED_NUMBER,      // Number, binary

    COMPRESSED_NUMERIC,	  // Number, left justified BCD, padded right with F
    NUMERIC,	          // Number, right justified BCD, padded left with 0

    VARIABLE_BITS,        // Proprietary, displayed bitwise)
    VARIABLE_BYTES,       // Proprietary, displayed bytewise hex)

    YYMMDD,               // Date format
    HHMMSS,               // Time format
}


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


export enum AnnotationValueReference {
    ISO_3166,             // Country
    ISO_4217,             // Currency
}


export class AnnotationValueReferenceHelper {

    static stringValueUsingReference(mappedValue: string, annotationValueReference: AnnotationValueReference): string {

        var stringValue: string = mappedValue + " (unmapped)";
        switch(annotationValueReference){
            case AnnotationValueReference.ISO_3166: {
                var countryNumber = parseInt(mappedValue, 10);
                var countryName = countryLookup.getName(countryNumber, "en");
                var countryAlpha2 = countryLookup.numericToAlpha2(mappedValue);
                stringValue = countryName + " (" + countryAlpha2 + ")";
                break;
            }
            case AnnotationValueReference.ISO_4217: {
                var currencyNumber = parseInt(mappedValue, 10);
                var currency = currencyLookup.currencies({number: currencyNumber})[0];
                var currencyName = currency.name;
                var currencyCode = currency.code;
                stringValue = currencyName + " (" + currencyCode + ")";
                break;
            }
        }
        return stringValue;
    }
}

export class AnnotationValueFormatHelper {

    static stringValueUsingFormat(value: Buffer, annotationValueFormat: AnnotationValueFormat): string {
        var rawValue: string = value.toString('hex').toUpperCase();
        var stringValue: string = rawValue;
        switch(annotationValueFormat){
            case AnnotationValueFormat.ALPHABETIC: {
                //TODO: extract to ByteHelper
                stringValue = value.toString('utf-8');
                break;
            }
            case AnnotationValueFormat.ALPHANUMERIC: {
                //TODO: extract to ByteHelper
                stringValue = value.toString('utf-8');
                break;
            }
            case AnnotationValueFormat.ALPHANUMERIC_SPECIAL: {
                //TODO: extract to ByteHelper
                stringValue = value.toString('utf-8');
                break;
            }
            case AnnotationValueFormat.UNSIGNED_NUMBER: {
                //TODO: make this conditional on how many bytes are available (extend OctetBuffer)
                //right now, this leads to error for number > 127
                //TODO: extract to ByteHelper
                stringValue = '' + value.readUInt8(value.length - 1);
                break;
            }
            case AnnotationValueFormat.VARIABLE_BYTES: {
                //TODO: extract to ByteHelper
                stringValue = rawValue;
                break;
            }
            case AnnotationValueFormat.VARIABLE_BITS: {
                //TODO: extract to ByteHelper
                var octetBuffer: OctetBuffer = new OctetBuffer(value);
                var bufferBinaryString: string = '';
                while (octetBuffer.remaining > 0){
                    var bufferByte: number = octetBuffer.readUInt8();
                    var bufferByteBinaryString: string = bufferByte.toString(2);

                    var requiredPadding: number = 8 - bufferByteBinaryString.length;
                    bufferByteBinaryString = Array(requiredPadding + 1).join('0') + bufferByteBinaryString;

                    bufferBinaryString += bufferByteBinaryString + ' ';
                }

                bufferBinaryString = bufferBinaryString.slice(0, -1);
                stringValue = bufferBinaryString;
                break;
            }
            case AnnotationValueFormat.COMPRESSED_NUMERIC: {
                stringValue = rawValue;
                //TODO: remove right padded F
                //TODO: extract to ByteHelper
                break;
            }
            case AnnotationValueFormat.NUMERIC: {
                stringValue = rawValue;
                //TODO: remove left padded 0
                //TODO: extract to ByteHelper
                break;
            }
            case AnnotationValueFormat.YYMMDD: {
                //TODO: extract to ByteHelper
                stringValue = rawValue;
                stringValue = stringValue.substring(0, 2) + '-' + stringValue.substring(2, 4) + '-' + stringValue.substring(4, 6);
                break;
            }
            case AnnotationValueFormat.HHMMSS: {
                //TODO: extract to ByteHelper
                stringValue = rawValue;
                stringValue = stringValue.substring(0, 2) + ':' + stringValue.substring(2, 4) + ':' + stringValue.substring(4, 6);
                break;
            }

        }
        return stringValue;
    }
}
