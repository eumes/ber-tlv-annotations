import { ITlv } from 'ber-tlv';
import { IAnnotatedTlv } from '../annotation/AnnotatedTlv';
export interface IAnnotationProvider {
    name: string;
    reference: string;
    lookup(item: ITlv): IAnnotatedTlv;
}
