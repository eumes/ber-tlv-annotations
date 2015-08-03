var currencyLookup = require('country-data').lookup;
var countryLookup = require('i18n-iso-countries');
var ByteHelper_1 = require('./ByteHelper');
(function (AnnotationValueFormat) {
    AnnotationValueFormat[AnnotationValueFormat["ALPHABETIC"] = 0] = "ALPHABETIC";
    AnnotationValueFormat[AnnotationValueFormat["ALPHANUMERIC"] = 1] = "ALPHANUMERIC";
    AnnotationValueFormat[AnnotationValueFormat["ALPHANUMERIC_SPECIAL"] = 2] = "ALPHANUMERIC_SPECIAL";
    AnnotationValueFormat[AnnotationValueFormat["UNSIGNED_NUMBER"] = 3] = "UNSIGNED_NUMBER";
    AnnotationValueFormat[AnnotationValueFormat["COMPRESSED_NUMERIC"] = 4] = "COMPRESSED_NUMERIC";
    AnnotationValueFormat[AnnotationValueFormat["NUMERIC"] = 5] = "NUMERIC";
    AnnotationValueFormat[AnnotationValueFormat["VARIABLE_BITS"] = 6] = "VARIABLE_BITS";
    AnnotationValueFormat[AnnotationValueFormat["VARIABLE_BYTES"] = 7] = "VARIABLE_BYTES";
    AnnotationValueFormat[AnnotationValueFormat["YYMMDD"] = 8] = "YYMMDD";
    AnnotationValueFormat[AnnotationValueFormat["HHMMSS"] = 9] = "HHMMSS";
})(exports.AnnotationValueFormat || (exports.AnnotationValueFormat = {}));
var AnnotationValueFormat = exports.AnnotationValueFormat;
(function (AnnotationValueReference) {
    AnnotationValueReference[AnnotationValueReference["ISO_3166"] = 0] = "ISO_3166";
    AnnotationValueReference[AnnotationValueReference["ISO_4217"] = 1] = "ISO_4217";
})(exports.AnnotationValueReference || (exports.AnnotationValueReference = {}));
var AnnotationValueReference = exports.AnnotationValueReference;
var AnnotationValueReferenceHelper = (function () {
    function AnnotationValueReferenceHelper() {
    }
    AnnotationValueReferenceHelper.stringValueUsingReference = function (mappedValue, annotationValueReference) {
        var stringValue = mappedValue + " (unmapped)";
        switch (annotationValueReference) {
            case AnnotationValueReference.ISO_3166: {
                var countryNumber = parseInt(mappedValue, 10);
                var countryName = countryLookup.getName(countryNumber, "en");
                var countryAlpha2 = countryLookup.numericToAlpha2(mappedValue);
                stringValue = countryName + " (" + countryAlpha2 + ")";
                break;
            }
            case AnnotationValueReference.ISO_4217: {
                var currencyNumber = parseInt(mappedValue, 10);
                var currency = currencyLookup.currencies({ number: currencyNumber })[0];
                var currencyName = currency.name;
                var currencyCode = currency.code;
                stringValue = currencyName + " (" + currencyCode + ")";
                break;
            }
        }
        return stringValue;
    };
    return AnnotationValueReferenceHelper;
})();
exports.AnnotationValueReferenceHelper = AnnotationValueReferenceHelper;
var AnnotationValueFormatHelper = (function () {
    function AnnotationValueFormatHelper() {
    }
    AnnotationValueFormatHelper.stringValueUsingFormat = function (value, annotationValueFormat) {
        var stringValue;
        switch (annotationValueFormat) {
            case AnnotationValueFormat.ALPHABETIC:
            case AnnotationValueFormat.ALPHANUMERIC:
            case AnnotationValueFormat.ALPHANUMERIC_SPECIAL: {
                stringValue = ByteHelper_1.ByteHelper.getUtf8(value);
                break;
            }
            case AnnotationValueFormat.UNSIGNED_NUMBER: {
                stringValue = ByteHelper_1.ByteHelper.getNumber(value);
                break;
            }
            case AnnotationValueFormat.VARIABLE_BYTES: {
                stringValue = ByteHelper_1.ByteHelper.getHex(value);
                break;
            }
            case AnnotationValueFormat.VARIABLE_BITS: {
                stringValue = ByteHelper_1.ByteHelper.getBits(value);
                break;
            }
            case AnnotationValueFormat.COMPRESSED_NUMERIC: {
                stringValue = ByteHelper_1.ByteHelper.getBcd(value);
                stringValue = ByteHelper_1.ByteHelper.stripSuffix(stringValue, 'F');
                break;
            }
            case AnnotationValueFormat.NUMERIC: {
                stringValue = ByteHelper_1.ByteHelper.getBcd(value);
                stringValue = ByteHelper_1.ByteHelper.stripPrefix(stringValue, '0');
                break;
            }
            case AnnotationValueFormat.YYMMDD: {
                stringValue = ByteHelper_1.ByteHelper.getYYMMDD(value);
                break;
            }
            case AnnotationValueFormat.HHMMSS: {
                stringValue = ByteHelper_1.ByteHelper.getHHMMSS(value);
                break;
            }
            default: {
                stringValue = ByteHelper_1.ByteHelper.getHex(value);
            }
        }
        return stringValue;
    };
    return AnnotationValueFormatHelper;
})();
exports.AnnotationValueFormatHelper = AnnotationValueFormatHelper;
