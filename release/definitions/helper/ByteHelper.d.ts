export declare class ByteHelper {
    static getUtf8(buffer: Buffer): string;
    static getHex(buffer: Buffer): string;
    static getBits(buffer: Buffer): string;
    static getBcd(buffer: Buffer): string;
    static getNumber(buffer: Buffer): string;
    static stripPrefix(value: string, prefix: string): string;
    static stripSuffix(value: string, suffix: string): string;
    static getYYMMDD(buffer: Buffer): string;
    static getHHMMSS(buffer: Buffer): string;
}
