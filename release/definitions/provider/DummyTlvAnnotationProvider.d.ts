import { ITlv } from 'ber-tlv';
import { ITlvAnnotation } from '../annotation/TlvAnnotation';
import { ITlvAnnotationProvider } from '../provider/TlvAnnotationProvider';
export declare class DummyTlvAnnotationProvider implements ITlvAnnotationProvider {
    name: string;
    reference: string;
    constructor();
    lookup(item: ITlv): ITlvAnnotation;
}
