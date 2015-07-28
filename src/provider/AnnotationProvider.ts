import { ITlv, TlvType, TlvClass } from 'ber-tlv';
import { IAnnotatedTlv, IAnnotatedTlvComponent } from '../annotation/AnnotatedTlv';

export interface IAnnotationProvider {
    name: string;
    reference: string;

    lookup(item: ITlv): IAnnotatedTlv;
}
