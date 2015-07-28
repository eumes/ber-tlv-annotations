import { ITlv, TlvFactory, TlvType } from 'ber-tlv';

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

export class DefaultAnnotatedTlv implements IAnnotatedTlv {
    public items: IAnnotatedTlv[];
    constructor(public tag: string, public type: TlvType, public rawValue: string, public mappedValue: string = null, public name: string = null, public description: string = null, public reference: string = null, public format: string = null, public components: IAnnotatedTlvComponent[] = null) {
        this.items = null;
    }
}

export class DefaultAnnotatedTlvComponent implements IAnnotatedTlvComponent {
    constructor(public name: string, public selector: string, public triggered: boolean, public value: string) {}
}
