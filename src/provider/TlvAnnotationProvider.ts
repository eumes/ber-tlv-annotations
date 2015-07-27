import { ITlv, TlvType, TlvClass } from 'ber-tlv';
import { ITlvAnnotation, ITlvAnnotationComponent } from '../annotation/TlvAnnotation';

export interface ITlvAnnotationProvider {
    name: string;
    reference: string;

    lookup(item: ITlv): ITlvAnnotation;
}
