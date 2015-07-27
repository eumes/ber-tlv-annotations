
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
