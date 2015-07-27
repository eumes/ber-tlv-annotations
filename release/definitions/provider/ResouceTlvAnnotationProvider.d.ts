import { ITlv } from 'ber-tlv';
import { ITlvAnnotation } from '../annotation/TlvAnnotation';
import { ITlvAnnotationProvider } from './TlvAnnotationProvider';
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
export declare class ResourceTlvAnnotationProvider implements ITlvAnnotationProvider {
    resource: ITlvAnnotationResource;
    name: string;
    reference: string;
    constructor(resource: ITlvAnnotationResource);
    lookup(item: ITlv): ITlvAnnotation;
    private buildAnnotationConstructed(item, resourceItem);
    private buildAnnotationPrimitive(item, resourceItem);
    private buildAnnotationReference(reference, mappedValue);
    private buildAnnotationComponents(mappedValue, resourceItem);
    private findItemWithTag(tag);
}
