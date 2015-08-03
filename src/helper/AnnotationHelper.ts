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
    VARIABLE_BYTES,       // Proprietary, displayed bytewise)

    YYMMDD,               // Date format
    HHMMSS,               // Time format
}




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
        var stringValue: string;
        switch(annotationValueFormat){
            case AnnotationValueFormat.ALPHABETIC:
            case AnnotationValueFormat.ALPHANUMERIC:
            case AnnotationValueFormat.ALPHANUMERIC_SPECIAL: {
                stringValue = ByteHelper.getUtf8(value);
                break;
            }
            case AnnotationValueFormat.UNSIGNED_NUMBER: {
                stringValue = ByteHelper.getNumber(value);
                break;
            }
            case AnnotationValueFormat.VARIABLE_BYTES: {
                stringValue = ByteHelper.getHex(value);
            }
            case AnnotationValueFormat.VARIABLE_BITS: {
                stringValue = ByteHelper.getBits(value);
                break;
            }
            case AnnotationValueFormat.COMPRESSED_NUMERIC: {
                stringValue = ByteHelper.getBcd(value);
                stringValue = ByteHelper.stripSuffix(stringValue, 'F');
                break;
            }
            case AnnotationValueFormat.NUMERIC: {
                stringValue = ByteHelper.getBcd(value);
                stringValue = ByteHelper.stripPrefix(stringValue, '0');
                break;
            }
            case AnnotationValueFormat.YYMMDD: {
                stringValue = ByteHelper.getYYMMDD(value);
                break;
            }
            case AnnotationValueFormat.HHMMSS: {
                stringValue = ByteHelper.getHHMMSS(value);
                break;
            }
            default: {
                stringValue = ByteHelper.getHex(value);
            }
        }
        return stringValue;
    }
}
