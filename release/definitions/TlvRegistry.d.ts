import { ITlv } from 'ber-tlv';
import { ITlvAnnotation } from './annotation/TlvAnnotation';
import { ITlvAnnotationProvider } from './provider/TlvAnnotationProvider';
export declare class TlvAnnotationRegistry {
    private defaultProvider;
    providers: ITlvAnnotationProvider[];
    constructor();
    lookupAnnotations(tlvItems: ITlv[]): ITlvAnnotation[];
    lookupAnnotation(tlvItem: ITlv): ITlvAnnotation;
    registerAnnotationProvider(provider: ITlvAnnotationProvider): void;
}
