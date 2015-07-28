declare module BerTlvAnnotations{

    export interface IAnnotatedTlv {
        tag: string;
        type: BerTlv.TlvType;
        rawValue: string;
        mappedValue: string;
        items: IAnnotatedTlv[];
        name: string;
        description: string;
        reference: string;
        format: string;
        components: IAnnotatedTlvComponent[];
    }
    export interface IAnnotatedTlvComponent {
        selector: string;
        name: string;
        triggered: boolean;
        value: string;
    }

    export interface IAnnotationProvider {
        name: string;
        reference: string;
        annotate(item: BerTlv.ITlv): IAnnotatedTlv;
    }

    export interface IAnnotationRegistry {
        lookupAnnotation(tlvItem: BerTlv.ITlv): IAnnotatedTlv;
        lookupAnnotations(items: BerTlv.ITlv[]): IAnnotatedTlv[];
        registerProvider(provider: IAnnotationProvider): void;
        registerPackagedProviders(): void;
    }
    export class AnnotationRegistry implements IAnnotationRegistry {
        private defaultProvider;
        providers: IAnnotationProvider[];
        constructor();
        lookupAnnotations(tlvItems: BerTlv.ITlv[]): IAnnotatedTlv[];
        lookupAnnotation(tlvItem: BerTlv.ITlv): IAnnotatedTlv;
        registerProvider(provider: IAnnotationProvider): void;
        registerPackagedProviders(): void;
    }

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
    export class ResourceBasedAnnotationProvider implements IAnnotationProvider {
        resource: ITlvAnnotationResource;
        name: string;
        reference: string;
        constructor(resource: ITlvAnnotationResource);
        annotate(item: BerTlv.ITlv): IAnnotatedTlv;
        private buildAnnotationConstructed(item, resourceItem);
        private buildAnnotationPrimitive(item, resourceItem);
        private buildAnnotationReference(reference, mappedValue);
        private buildAnnotationComponents(mappedValue, resourceItem);
        private findItemWithTag(tag);
    }
}

declare module 'ber-tlv-annotations'{
  export = BerTlvAnnotations;
}
