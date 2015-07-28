import { ITlv, TlvType } from 'ber-tlv';
import { IAnnotatedTlv, IAnnotatedTlvComponent } from './annotation/AnnotatedTlv';
import { IAnnotationProvider } from './provider/AnnotationProvider';
import { DummyAnnotationProvider } from './provider/DummyAnnotationProvider';

export interface IAnnotationRegistry {

    lookupAnnotation(tlvItem: ITlv): IAnnotatedTlv;
    lookupAnnotations(items: ITlv[]): IAnnotatedTlv[];
    registerProvider(provider: IAnnotationProvider): void;

}

export class AnnotationRegistry implements IAnnotationRegistry {

    private defaultProvider: IAnnotationProvider;
    public providers: IAnnotationProvider[];

    constructor(){
        this.providers = [];
        this.defaultProvider = new DummyAnnotationProvider();
    }

    public lookupAnnotations(tlvItems: ITlv[]): IAnnotatedTlv[]{
        var annotationItems: IAnnotatedTlv[] = [];
        for (var i: number = 0; i < tlvItems.length; i++){
            var tlvItem: ITlv = tlvItems[i];
            var tlvAnnotation: IAnnotatedTlv = this.lookupAnnotation(tlvItem);
            annotationItems.push(tlvAnnotation);

            if (tlvItem.items !== null){
                var subAnnotationItems: IAnnotatedTlv[] = this.lookupAnnotations(tlvItem.items);
                tlvAnnotation.items = subAnnotationItems;
            }
        }
        return annotationItems;
    }

    public lookupAnnotation(tlvItem: ITlv): IAnnotatedTlv {
        for (var i: number = 0; i < this.providers.length; i++){
            var provider: IAnnotationProvider = this.providers[i];
            var annotation: IAnnotatedTlv = provider.annotate(tlvItem);
            if (annotation !== null){
                return annotation;
            }
        }

        return this.defaultProvider.annotate(tlvItem);
    }

    public registerProvider(provider: IAnnotationProvider): void {
        this.providers.push(provider);
    }
}
