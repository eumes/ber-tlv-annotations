import { ITlv } from 'ber-tlv';
import { ITlvAnnotation } from '../annotation/TlvAnnotation';
export interface ITlvAnnotationProvider {
    name: string;
    reference: string;
    lookup(item: ITlv): ITlvAnnotation;
}
