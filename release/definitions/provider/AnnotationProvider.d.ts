import { ITlv } from 'ber-tlv';
import { IAnnotatedTlv } from '../annotation/AnnotatedTlv';
export interface IAnnotationProvider {
    name: string;
    reference: string;
    annotate(item: ITlv): IAnnotatedTlv;
}
