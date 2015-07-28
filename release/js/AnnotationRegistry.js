var DummyAnnotationProvider_1 = require('./provider/DummyAnnotationProvider');
var PackagedProviders_1 = require('./packaged/PackagedProviders');
var AnnotationRegistry = (function () {
    function AnnotationRegistry() {
        this.providers = [];
        this.defaultProvider = new DummyAnnotationProvider_1.DummyAnnotationProvider();
    }
    AnnotationRegistry.prototype.lookupAnnotations = function (tlvItems) {
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
    AnnotationRegistry.prototype.lookupAnnotation = function (tlvItem) {
        for (var i = 0; i < this.providers.length; i++) {
            var provider = this.providers[i];
            var annotation = provider.annotate(tlvItem);
            if (annotation !== null) {
                return annotation;
            }
        }
        return this.defaultProvider.annotate(tlvItem);
    };
    AnnotationRegistry.prototype.registerProvider = function (provider) {
        this.providers.push(provider);
    };
    AnnotationRegistry.prototype.registerPackagedProviders = function () {
        this.registerProvider(PackagedProviders_1.PackagedProviders.emv());
        this.registerProvider(PackagedProviders_1.PackagedProviders.kernel2());
        this.registerProvider(PackagedProviders_1.PackagedProviders.kernel3());
    };
    return AnnotationRegistry;
})();
exports.AnnotationRegistry = AnnotationRegistry;
