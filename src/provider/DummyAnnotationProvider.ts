import { ITlv, TlvType, TlvClass } from 'ber-tlv';

import { IAnnotatedTlv, IAnnotatedTlvComponent, DefaultAnnotatedTlv, DefaultAnnotatedTlvComponent } from '../annotation/AnnotatedTlv';
import { AnnotationValueFormat, AnnotationValueFormatHelper } from '../helper/AnnotationHelper';
import { IAnnotationProvider } from '../provider/AnnotationProvider';

export class DummyAnnotationProvider implements IAnnotationProvider {
    public name: string;
    public reference: string;

    constructor(){
      this.reference = '<none>';
      this.name = '<none>';
    }

    annotate(item: ITlv): IAnnotatedTlv {
        var tag: string = item.tag;
        var type: TlvType = item.type;
        var rawValue: string = AnnotationValueFormatHelper.stringValueUsingFormat(item.value, AnnotationValueFormat.VARIABLE_BYTES);

        var annotation: IAnnotatedTlv = new DefaultAnnotatedTlv(tag, type, rawValue);
        return annotation;
    }
}
