import { TlvType } from 'ber-tlv';
export interface IAnnotatedTlv {
    tag: string;
    type: TlvType;
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
export declare class DefaultAnnotatedTlv implements IAnnotatedTlv {
    tag: string;
    type: TlvType;
    rawValue: string;
    mappedValue: string;
    name: string;
    description: string;
    reference: string;
    format: string;
    components: IAnnotatedTlvComponent[];
    items: IAnnotatedTlv[];
    constructor(tag: string, type: TlvType, rawValue: string, mappedValue?: string, name?: string, description?: string, reference?: string, format?: string, components?: IAnnotatedTlvComponent[]);
}
export declare class DefaultAnnotatedTlvComponent implements IAnnotatedTlvComponent {
    name: string;
    selector: string;
    triggered: boolean;
    value: string;
    constructor(name: string, selector: string, triggered: boolean, value: string);
}
