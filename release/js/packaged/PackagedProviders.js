var ResourceBasedAnnotationProvider_1 = require('../provider/ResourceBasedAnnotationProvider');
var PackagedProviders = (function () {
    function PackagedProviders() {
    }
    PackagedProviders.kernel2 = function () {
        var kernel2 = require('../../annotations/kernel2.json');
        return new ResourceBasedAnnotationProvider_1.ResourceBasedAnnotationProvider(kernel2);
    };
    PackagedProviders.kernel3 = function () {
        var kernel3 = require('../../annotations/kernel3.json');
        return new ResourceBasedAnnotationProvider_1.ResourceBasedAnnotationProvider(kernel3);
    };
    PackagedProviders.emv = function () {
        var emv = require('../../annotations/emv.json');
        return new ResourceBasedAnnotationProvider_1.ResourceBasedAnnotationProvider(emv);
    };
    return PackagedProviders;
})();
exports.PackagedProviders = PackagedProviders;
