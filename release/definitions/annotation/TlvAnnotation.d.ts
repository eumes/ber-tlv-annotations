import { TlvType } from 'ber-tlv';
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
export declare class TlvAnnotation implements ITlvAnnotation {
    tag: string;
    type: TlvType;
    rawValue: string;
    mappedValue: string;
    name: string;
    description: string;
    reference: string;
    format: string;
    components: ITlvAnnotationComponent[];
    items: ITlvAnnotation[];
    constructor(tag: string, type: TlvType, rawValue: string, mappedValue?: string, name?: string, description?: string, reference?: string, format?: string, components?: ITlvAnnotationComponent[]);
}
export declare class TlvAnnotationComponent implements ITlvAnnotationComponent {
    name: string;
    selector: string;
    triggered: boolean;
    value: string;
    constructor(name: string, selector: string, triggered: boolean, value: string);
}
