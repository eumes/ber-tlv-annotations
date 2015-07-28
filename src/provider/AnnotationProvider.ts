import { ITlv, TlvType, TlvClass } from 'ber-tlv';
import { IAnnotatedTlv, IAnnotatedTlvComponent } from '../annotation/AnnotatedTlv';

export interface IAnnotationProvider {
    name: string;
    reference: string;

    annotate(item: ITlv): IAnnotatedTlv;
}
