import { OctetBuffer } from 'octet-buffer';
import { ITlv, TlvType, TlvClass } from 'ber-tlv';

import { BitMatcher } from '../helper/BitMatcher';
import { IAnnotatedTlv, IAnnotatedTlvComponent, DefaultAnnotatedTlv, DefaultAnnotatedTlvComponent } from '../annotation/AnnotatedTlv';
import { AnnotationValueFormat, AnnotationValueReference, AnnotationValueFormatHelper, AnnotationValueReferenceHelper } from '../helper/AnnotationHelper';
import { IAnnotationProvider } from './AnnotationProvider';

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
    bitmatch: string;
}


export class ResourceBasedAnnotationProvider implements IAnnotationProvider {
    public name: string;
    public reference: string;

    constructor(public resource: ITlvAnnotationResource){
      this.reference = resource.reference;
      this.name = resource.name;
    }

    annotate(item: ITlv): IAnnotatedTlv {
        var resourceItem: ITlvAnnotationResourceItem = this.findItemWithTag(item.tag);
        if (resourceItem == null){
            return null;
        }

        var annotation: IAnnotatedTlv;
        if (item.type === TlvType.PRIMITIVE){
          annotation = this.buildAnnotationPrimitive(item, resourceItem);
        }
        else {
          annotation = this.buildAnnotationConstructed(item, resourceItem);
        }
        return annotation;
    }

    private buildAnnotationConstructed(item: ITlv, resourceItem: ITlvAnnotationResourceItem): IAnnotatedTlv {
        var tag: string = item.tag;
        var type: TlvType = item.type;
        var name: string = resourceItem.name;
        var description: string = resourceItem.description;
        var reference: string = this.reference;

        var annotationItem: IAnnotatedTlv = new DefaultAnnotatedTlv(tag, type, null, null, name, description, reference);
        return annotationItem;
    }

    private buildAnnotationPrimitive(item: ITlv, resourceItem: ITlvAnnotationResourceItem): IAnnotatedTlv {
        var tag: string = item.tag;
        var type: TlvType = item.type;
        var name: string = resourceItem.name;
        var description: string = resourceItem.description;
        var reference: string = this.reference;
        var format: string = resourceItem.format;
        var reference: string = resourceItem.reference;
        var rawValue: string = item.value.toString('hex').toUpperCase();
        var mappedValue: string = AnnotationValueFormatHelper.stringValueUsingFormat(item.value, (<any>AnnotationValueFormat)[format]); //enum workaround
        var componentsItems: IAnnotatedTlvComponent[] = this.buildAnnotationComponents(mappedValue, resourceItem);
        var referenceItem: IAnnotatedTlvComponent = this.buildAnnotationReference(reference, mappedValue);

        var mergedComponents: IAnnotatedTlvComponent[] = [];
        if (componentsItems !== null){
            mergedComponents = mergedComponents.concat(componentsItems);
        }
        if (referenceItem !== null){
            mergedComponents = mergedComponents.concat(referenceItem);
        }
        if (mergedComponents.length === 0){
            mergedComponents = null;
        }

        var annotationItem: IAnnotatedTlv = new DefaultAnnotatedTlv(tag, type, rawValue, mappedValue, name, description, reference, format, mergedComponents);
        return annotationItem;
    }

    private buildAnnotationReference(reference: string, mappedValue: string): IAnnotatedTlvComponent {
        if (reference == null || reference.length === 0){
            return null;
        }

        var referenceEnum: AnnotationValueReference = (<any>AnnotationValueReference)[reference];
        var referenceValue: string = AnnotationValueReferenceHelper.stringValueUsingReference(mappedValue, referenceEnum);

        var referenceComponent: IAnnotatedTlvComponent = new DefaultAnnotatedTlvComponent(reference, mappedValue, true, referenceValue);
        return referenceComponent;
    }

    private buildAnnotationComponents(mappedValue: string, resourceItem: ITlvAnnotationResourceItem): IAnnotatedTlvComponent[] {
        if (resourceItem.components == null || resourceItem.components.length === 0){
            return null;
        }

        var valueComponents: IAnnotatedTlvComponent[] = [];
        for (var i: number = 0; i < resourceItem.components.length; i++){
            var resourceComponent: ITlvAnnotationResourceItemComponents = resourceItem.components[i];
            var name: string = resourceComponent.name;
            var selector: string = null;
            var triggered: boolean = false;
            var value: string = null;

            if (resourceComponent.bitmatch != null){
                selector = resourceComponent.bitmatch;
                triggered = BitMatcher.matches(mappedValue, resourceComponent.bitmatch);
            }

            var valueComponent: IAnnotatedTlvComponent = new DefaultAnnotatedTlvComponent(name, selector, triggered, value);
            valueComponents.push(valueComponent);
        }
        return valueComponents;
    }

    private findItemWithTag(tag: string): ITlvAnnotationResourceItem{
        for (var i: number = 0; i < this.resource.items.length; i++){
            var item: ITlvAnnotationResourceItem = this.resource.items[i];
            if (item.tag === tag){
                return item;
            }
        }
        return null;
    }
}
