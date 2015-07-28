var AnnotatedTlv_1 = require('../annotation/AnnotatedTlv');
var AnnotationHelper_1 = require('../helper/AnnotationHelper');
var DummyAnnotationProvider = (function () {
    function DummyAnnotationProvider() {
        this.reference = '<none>';
        this.name = '<none>';
    }
    DummyAnnotationProvider.prototype.annotate = function (item) {
        var tag = item.tag;
        var type = item.type;
        var rawValue = AnnotationHelper_1.AnnotationValueFormatHelper.stringValueUsingFormat(item.value, AnnotationHelper_1.AnnotationValueFormat.VARIABLE_BYTES);
        var annotation = new AnnotatedTlv_1.DefaultAnnotatedTlv(tag, type, rawValue);
        return annotation;
    };
    return DummyAnnotationProvider;
})();
exports.DummyAnnotationProvider = DummyAnnotationProvider;
