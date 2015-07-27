import { ITlv, TlvFactory, TlvType } from 'ber-tlv';

export interface ITlvAnnotation {
    tag: string;
    type: TlvType;
    rawValue: string;
    mappedValue: string;
    items: ITlvAnnotation[];

    name: string;
    description: string;
    reference: string;
    format: string;
    components: ITlvAnnotationComponent[];
}


export interface ITlvAnnotationComponent {
    selector: string;
    name: string;
    triggered: boolean;
    value: string;
}

export class TlvAnnotation implements ITlvAnnotation {
    public items: ITlvAnnotation[];
    constructor(public tag: string, public type: TlvType, public rawValue: string, public mappedValue: string = null, public name: string = null, public description: string = null, public reference: string = null, public format: string = null, public components: ITlvAnnotationComponent[] = null) {
        this.items = null;
    }
}

export class TlvAnnotationComponent implements ITlvAnnotationComponent {
    constructor(public name: string, public selector: string, public triggered: boolean, public value: string) {}
}
