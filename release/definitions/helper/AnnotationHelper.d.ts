export declare enum AnnotationValueFormat {
    ALPHABETIC = 0,
    ALPHANUMERIC = 1,
    ALPHANUMERIC_SPECIAL = 2,
    UNSIGNED_NUMBER = 3,
    COMPRESSED_NUMERIC = 4,
    NUMERIC = 5,
    VARIABLE_BITS = 6,
    VARIABLE_BYTES = 7,
    YYMMDD = 8,
    HHMMSS = 9,
}
export declare enum AnnotationValueReference {
    ISO_3166 = 0,
    ISO_4217 = 1,
}
export declare class AnnotationValueReferenceHelper {
    static stringValueUsingReference(mappedValue: string, annotationValueReference: AnnotationValueReference): string;
}
export declare class AnnotationValueFormatHelper {
    static stringValueUsingFormat(value: Buffer, annotationValueFormat: AnnotationValueFormat): string;
}
