import { ITlv, TlvType, TlvClass } from 'ber-tlv';
import { IAnnotatedTlv, IAnnotatedTlvComponent } from '../annotation/AnnotatedTlv';

export interface ITlvAnnotationProvider {
    name: string;
    reference: string;

    lookup(item: ITlv): IAnnotatedTlv;
}
