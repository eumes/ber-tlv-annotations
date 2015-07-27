var octet_buffer_1 = require('octet-buffer');
var ByteHelper = (function () {
    function ByteHelper() {
    }
    ByteHelper.getUtf8 = function (buffer) {
        var utf8 = buffer.toString('utf8').toUpperCase();
        return utf8;
    };
    ByteHelper.getHex = function (buffer) {
        var hex = buffer.toString('hex').toUpperCase();
        return hex;
    };
    ByteHelper.getBits = function (buffer) {
        var octetBuffer = new octet_buffer_1.OctetBuffer(buffer);
        var bufferBinaryString = '';
        while (octetBuffer.remaining > 0) {
            var bufferByte = octetBuffer.readUInt8();
            var bufferByteBinaryString = bufferByte.toString(2);
            var requiredPadding = 8 - bufferByteBinaryString.length;
            bufferByteBinaryString = Array(requiredPadding + 1).join('0') + bufferByteBinaryString;
            bufferBinaryString += bufferByteBinaryString + ' ';
        }
        bufferBinaryString = bufferBinaryString.slice(0, -1);
        return bufferBinaryString;
    };
    ByteHelper.getBcd = function (buffer) {
        var bcd = this.getHex(buffer);
        return bcd;
    };
    ByteHelper.getNumber = function (buffer) {
        var octetBuffer = new octet_buffer_1.OctetBuffer(buffer);
        var bufferShiftetNumber = 0;
        while (octetBuffer.remaining > 0) {
            var bufferByte = octetBuffer.readUInt8();
            bufferShiftetNumber = (bufferShiftetNumber << 8) | bufferByte;
        }
        return bufferShiftetNumber.toString();
    };
    ByteHelper.stripPrefix = function (value, prefix) {
        return value;
    };
    ByteHelper.stripSuffix = function (value, suffix) {
        return value;
    };
    ByteHelper.getYYMMDD = function (buffer) {
        var yymmdd = this.getHex(buffer);
        yymmdd = yymmdd.substring(0, 2) + '-' + yymmdd.substring(2, 4) + '-' + yymmdd.substring(4, 6);
        return yymmdd;
    };
    ByteHelper.getHHMMSS = function (buffer) {
        var hhmmss = this.getHex(buffer);
        hhmmss = hhmmss.substring(0, 2) + ':' + hhmmss.substring(2, 4) + ':' + hhmmss.substring(4, 6);
        return hhmmss;
    };
    return ByteHelper;
})();
exports.ByteHelper = ByteHelper;
