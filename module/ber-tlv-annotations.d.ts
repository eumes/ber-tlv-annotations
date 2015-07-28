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
}

declare module 'ber-tlv-annotations'{
  export = BerTlvAnnotations;
}
