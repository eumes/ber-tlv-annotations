import { ITlv, TlvType, TlvClass } from 'ber-tlv';

import { ITlvAnnotation, ITlvAnnotationComponent, TlvAnnotation, TlvAnnotationComponent } from '../annotation/TlvAnnotation';
import { AnnotationValueFormat, AnnotationValueFormatHelper } from '../helper/AnnotationHelper';
import { ITlvAnnotationProvider } from '../provider/TlvAnnotationProvider';

export class DummyTlvAnnotationProvider implements ITlvAnnotationProvider {
    public name: string;
    public reference: string;

    constructor(){
      this.reference = '<none>';
      this.name = '<none>';
    }

    lookup(item: ITlv): ITlvAnnotation {
        var tag: string = item.tag;
        var type: TlvType = item.type;
        var rawValue: string = AnnotationValueFormatHelper.stringValueUsingFormat(item.value, AnnotationValueFormat.VARIABLE_BYTES);

        var annotation: ITlvAnnotation = new TlvAnnotation(tag, type, rawValue);
        return annotation;
    }
}
