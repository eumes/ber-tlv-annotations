import { ITlv } from 'ber-tlv';
import { IAnnotatedTlv } from '../annotation/AnnotatedTlv';
import { IAnnotationProvider } from './AnnotationProvider';
export interface ITlvAnnotationResource {
    name: string;
    reference: string;
    items: ITlvAnnotationResourceItem[];
}
export interface ITlvAnnotationResourceItem {
    tag: string;
    name: string;
    description: string;
    format?: string;
    reference?: string;
    components?: ITlvAnnotationResourceItemComponents[];
}
export interface ITlvAnnotationResourceItemComponents {
    name: string;
    bitmatch: string;
}
export declare class ResourceBasedAnnotationProvider implements IAnnotationProvider {
    resource: ITlvAnnotationResource;
    name: string;
    reference: string;
    constructor(resource: ITlvAnnotationResource);
    annotate(item: ITlv): IAnnotatedTlv;
    private buildAnnotationConstructed(item, resourceItem);
    private buildAnnotationPrimitive(item, resourceItem);
    private buildAnnotationReference(reference, mappedValue);
    private buildAnnotationComponents(mappedValue, resourceItem);
    private findItemWithTag(tag);
}
