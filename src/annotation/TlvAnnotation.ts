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
