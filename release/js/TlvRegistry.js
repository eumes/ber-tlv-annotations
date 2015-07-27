var DummyTlvAnnotationProvider_1 = require('./provider/DummyTlvAnnotationProvider');
var TlvAnnotationRegistry = (function () {
    function TlvAnnotationRegistry() {
        this.providers = [];
        this.defaultProvider = new DummyTlvAnnotationProvider_1.DummyTlvAnnotationProvider();
    }
    TlvAnnotationRegistry.prototype.lookupAnnotations = function (tlvItems) {
        var annotationItems = [];
        for (var i = 0; i < tlvItems.length; i++) {
            var tlvItem = tlvItems[i];
            var tlvAnnotation = this.lookupAnnotation(tlvItem);
            annotationItems.push(tlvAnnotation);
            if (tlvItem.items !== null) {
                var subAnnotationItems = this.lookupAnnotations(tlvItem.items);
                tlvAnnotation.items = subAnnotationItems;
            }
        }
        return annotationItems;
    };
    TlvAnnotationRegistry.prototype.lookupAnnotation = function (tlvItem) {
        for (var i = 0; i < this.providers.length; i++) {
            var provider = this.providers[i];
            var annotation = provider.lookup(tlvItem);
            if (annotation !== null) {
                return annotation;
            }
        }
        return this.defaultProvider.lookup(tlvItem);
    };
    TlvAnnotationRegistry.prototype.registerAnnotationProvider = function (provider) {
        this.providers.push(provider);
    };
    return TlvAnnotationRegistry;
})();
exports.TlvAnnotationRegistry = TlvAnnotationRegistry;
