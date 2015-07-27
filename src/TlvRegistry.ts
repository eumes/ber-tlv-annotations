import { ITlv, TlvType } from 'ber-tlv';
import { ITlvAnnotation, ITlvAnnotationComponent } from './annotation/TlvAnnotation';
import { ITlvAnnotationProvider } from './provider/TlvAnnotationProvider';
import { DummyTlvAnnotationProvider } from './provider/DummyTlvAnnotationProvider';

export class TlvAnnotationRegistry {

    private defaultProvider: ITlvAnnotationProvider;
    public providers: ITlvAnnotationProvider[];

    constructor(){
        this.providers = [];
        this.defaultProvider = new DummyTlvAnnotationProvider();
    }

    public lookupAnnotations(tlvItems: ITlv[]): ITlvAnnotation[]{
        var annotationItems: ITlvAnnotation[] = [];
        for (var i: number = 0; i < tlvItems.length; i++){
            var tlvItem: ITlv = tlvItems[i];
            var tlvAnnotation: ITlvAnnotation = this.lookupAnnotation(tlvItem);
            annotationItems.push(tlvAnnotation);

            if (tlvItem.items !== null){
                var subAnnotationItems: ITlvAnnotation[] = this.lookupAnnotations(tlvItem.items);
                tlvAnnotation.items = subAnnotationItems;
            }
        }
        return annotationItems;
    }

    public lookupAnnotation(tlvItem: ITlv): ITlvAnnotation {
        for (var i: number = 0; i < this.providers.length; i++){
            var provider: ITlvAnnotationProvider = this.providers[i];
            var annotation: ITlvAnnotation = provider.lookup(tlvItem);
            if (annotation !== null){
                return annotation;
            }
        }

        return this.defaultProvider.lookup(tlvItem);
    }

    //TODO: ITlvAnnotationProvider[]
    public registerAnnotationProvider(provider: ITlvAnnotationProvider): void {
        this.providers.push(provider);
    }
}
