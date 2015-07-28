import { IAnnotationProvider } from '../provider/AnnotationProvider';
import { ResourceBasedAnnotationProvider, ITlvAnnotationResource } from '../provider/ResourceBasedAnnotationProvider';

export class PackagedProviders {

    static kernel2(): IAnnotationProvider {
        var kernel2: ITlvAnnotationResource = <ITlvAnnotationResource>require('../../annotations/kernel2.json');
        return new ResourceBasedAnnotationProvider(kernel2);
    }

    static kernel3(): IAnnotationProvider {
        var kernel3: ITlvAnnotationResource = <ITlvAnnotationResource>require('../../annotations/kernel3.json');
        return new ResourceBasedAnnotationProvider(kernel3);
    }

    static emv(): IAnnotationProvider {
        var emv: ITlvAnnotationResource = <ITlvAnnotationResource>require('../../annotations/emv.json');
        return new ResourceBasedAnnotationProvider(emv);
    }
}
