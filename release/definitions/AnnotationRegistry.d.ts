import { ITlv } from 'ber-tlv';
import { IAnnotatedTlv } from './annotation/AnnotatedTlv';
import { IAnnotationProvider } from './provider/AnnotationProvider';
export interface IAnnotationRegistry {
    lookupAnnotation(tlvItem: ITlv): IAnnotatedTlv;
    lookupAnnotations(items: ITlv[]): IAnnotatedTlv[];
    registerProvider(provider: IAnnotationProvider): void;
    registerPackagedProviders(): void;
}
export declare class AnnotationRegistry implements IAnnotationRegistry {
    private defaultProvider;
    providers: IAnnotationProvider[];
    constructor();
    lookupAnnotations(tlvItems: ITlv[]): IAnnotatedTlv[];
    lookupAnnotation(tlvItem: ITlv): IAnnotatedTlv;
    registerProvider(provider: IAnnotationProvider): void;
    registerPackagedProviders(): void;
}
