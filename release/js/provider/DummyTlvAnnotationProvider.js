var TlvAnnotation_1 = require('../annotation/TlvAnnotation');
var AnnotationHelper_1 = require('../helper/AnnotationHelper');
var DummyTlvAnnotationProvider = (function () {
    function DummyTlvAnnotationProvider() {
        this.reference = '<none>';
        this.name = '<none>';
    }
    DummyTlvAnnotationProvider.prototype.lookup = function (item) {
        var tag = item.tag;
        var type = item.type;
        var rawValue = AnnotationHelper_1.AnnotationValueFormatHelper.stringValueUsingFormat(item.value, AnnotationHelper_1.AnnotationValueFormat.VARIABLE_BYTES);
        var annotation = new TlvAnnotation_1.TlvAnnotation(tag, type, rawValue);
        return annotation;
    };
    return DummyTlvAnnotationProvider;
})();
exports.DummyTlvAnnotationProvider = DummyTlvAnnotationProvider;
