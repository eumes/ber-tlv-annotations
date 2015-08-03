export declare class BitMatcher {
    static matches(reference: string, bitmatch: string): boolean;
    private static matchesPattern(reference, pattern);
    private static matchesBitmask(reference, bitmask);
    private static generateBitmask(bitmask);
    private static matchesBitpattern(reference, bitpattern);
}
