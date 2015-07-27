import { ITlvAnnotationProvider, DefaultTlvAnnotationProvider } from './TlvAnnotations';

//TODO: extract to TlvAnnotationResource
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
    bitmask?: string;
    pattern?: string;
    bitpattern?: string;
}



export class DefaultAnnotations {

    static kernel2(): ITlvAnnotationProvider {
        var kernel2 = require('../annotations/kernel2.json');
        return new DefaultTlvAnnotationProvider(kernel2);
    }

    static kernel3(): ITlvAnnotationProvider {
        var kernel2 = require('../annotations/kernel3.json');
        return new DefaultTlvAnnotationProvider(kernel2);
    }

    static emv(): ITlvAnnotationProvider {
        var kernel2 = require('../annotations/emv.json');
        return new DefaultTlvAnnotationProvider(kernel2);
    }
}
