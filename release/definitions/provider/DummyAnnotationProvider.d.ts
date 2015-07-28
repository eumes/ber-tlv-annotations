import { ITlv } from 'ber-tlv';
import { IAnnotatedTlv } from '../annotation/AnnotatedTlv';
import { IAnnotationProvider } from '../provider/AnnotationProvider';
export declare class DummyAnnotationProvider implements IAnnotationProvider {
    name: string;
    reference: string;
    constructor();
    annotate(item: ITlv): IAnnotatedTlv;
}
