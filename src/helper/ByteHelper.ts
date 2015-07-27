import { OctetBuffer } from 'octet-buffer';

export class ByteHelper {

    static getUtf8(buffer: Buffer): string {
        var utf8: string = buffer.toString('utf8').toUpperCase();
        return utf8;
    }

    static getHex(buffer: Buffer): string {
        var hex: string = buffer.toString('hex').toUpperCase();
        return hex;
    }

    static getBits(buffer: Buffer): string {
        var octetBuffer: OctetBuffer = new OctetBuffer(buffer);
        var bufferBinaryString: string = '';
        while (octetBuffer.remaining > 0){
            var bufferByte: number = octetBuffer.readUInt8();
            var bufferByteBinaryString: string = bufferByte.toString(2);

            var requiredPadding: number = 8 - bufferByteBinaryString.length;
            bufferByteBinaryString = Array(requiredPadding + 1).join('0') + bufferByteBinaryString;

            bufferBinaryString += bufferByteBinaryString + ' ';
        }

        bufferBinaryString = bufferBinaryString.slice(0, -1);
        return bufferBinaryString;
    }

    static getBcd(buffer: Buffer): string {
        var bcd: string = this.getHex(buffer);
        return bcd;
    }

    static getNumber(buffer: Buffer): string {
        var octetBuffer: OctetBuffer = new OctetBuffer(buffer);
        var bufferShiftetNumber: number = 0;
        while (octetBuffer.remaining > 0){
            var bufferByte: number = octetBuffer.readUInt8();
            bufferShiftetNumber = (bufferShiftetNumber << 8) | bufferByte;
        }
        return bufferShiftetNumber.toString();
    }
    
    static stripPrefix(value: string, prefix: string): string {
        //TODO: implement
        return value;
    }
    static stripSuffix(value: string, suffix: string): string {
        //TODO: implement
        return value;
    }

    static getYYMMDD(buffer: Buffer): string {
        var yymmdd: string = this.getHex(buffer);
        yymmdd = yymmdd.substring(0, 2) + '-' + yymmdd.substring(2, 4) + '-' + yymmdd.substring(4, 6);
        return yymmdd;
    }

    static getHHMMSS(buffer: Buffer): string {
        var hhmmss: string = this.getHex(buffer);
        hhmmss = hhmmss.substring(0, 2) + ':' + hhmmss.substring(2, 4) + ':' + hhmmss.substring(4, 6);
        return hhmmss;
    }

}
