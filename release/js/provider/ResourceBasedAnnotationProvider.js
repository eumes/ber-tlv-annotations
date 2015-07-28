var ber_tlv_1 = require('ber-tlv');
var ByteMatcher_1 = require('../helper/ByteMatcher');
var AnnotatedTlv_1 = require('../annotation/AnnotatedTlv');
var AnnotationHelper_1 = require('../helper/AnnotationHelper');
var ResourceBasedAnnotationProvider = (function () {
    function ResourceBasedAnnotationProvider(resource) {
        this.resource = resource;
        this.reference = resource.reference;
        this.name = resource.name;
    }
    ResourceBasedAnnotationProvider.prototype.annotate = function (item) {
        var resourceItem = this.findItemWithTag(item.tag);
        if (resourceItem == null) {
            return null;
        }
        var annotation;
        if (item.type === ber_tlv_1.TlvType.PRIMITIVE) {
            annotation = this.buildAnnotationPrimitive(item, resourceItem);
        }
        else {
            annotation = this.buildAnnotationConstructed(item, resourceItem);
        }
        return annotation;
    };
    ResourceBasedAnnotationProvider.prototype.buildAnnotationConstructed = function (item, resourceItem) {
        var tag = item.tag;
        var type = item.type;
        var name = resourceItem.name;
        var description = resourceItem.description;
        var reference = this.reference;
        var rawValue = item.value.toString('hex').toUpperCase();
        var annotationItem = new AnnotatedTlv_1.DefaultAnnotatedTlv(tag, type, rawValue, null, name, description, reference);
        return annotationItem;
    };
    ResourceBasedAnnotationProvider.prototype.buildAnnotationPrimitive = function (item, resourceItem) {
        var tag = item.tag;
        var type = item.type;
        var name = resourceItem.name;
        var description = resourceItem.description;
        var reference = this.reference;
        var format = resourceItem.format;
        var reference = resourceItem.reference;
        var rawValue = item.value.toString('hex').toUpperCase();
        var mappedValue = AnnotationHelper_1.AnnotationValueFormatHelper.stringValueUsingFormat(item.value, AnnotationHelper_1.AnnotationValueFormat[format]);
        var componentsItems = this.buildAnnotationComponents(mappedValue, resourceItem);
        var referenceItem = this.buildAnnotationReference(reference, mappedValue);
        var mergedComponents = [];
        if (componentsItems !== null) {
            mergedComponents = mergedComponents.concat(componentsItems);
        }
        if (referenceItem !== null) {
            mergedComponents = mergedComponents.concat(referenceItem);
        }
        if (mergedComponents.length === 0) {
            mergedComponents = null;
        }
        var annotationItem = new AnnotatedTlv_1.DefaultAnnotatedTlv(tag, type, rawValue, mappedValue, name, description, reference, format, mergedComponents);
        return annotationItem;
    };
    ResourceBasedAnnotationProvider.prototype.buildAnnotationReference = function (reference, mappedValue) {
        if (reference == null || reference.length === 0) {
            return null;
        }
        var referenceEnum = AnnotationHelper_1.AnnotationValueReference[reference];
        var referenceValue = AnnotationHelper_1.AnnotationValueReferenceHelper.stringValueUsingReference(mappedValue, referenceEnum);
        var referenceComponent = new AnnotatedTlv_1.DefaultAnnotatedTlvComponent(reference, mappedValue, true, referenceValue);
        return referenceComponent;
    };
    ResourceBasedAnnotationProvider.prototype.buildAnnotationComponents = function (mappedValue, resourceItem) {
        if (resourceItem.components == null || resourceItem.components.length === 0) {
            return null;
        }
        var valueComponents = [];
        for (var i = 0; i < resourceItem.components.length; i++) {
            var resourceComponent = resourceItem.components[i];
            var name = resourceComponent.name;
            var selector = null;
            var triggered = false;
            var value = null;
            if (resourceComponent.bitmatch != null) {
                selector = resourceComponent.bitmatch;
                triggered = ByteMatcher_1.ByteMatcher.matchesBitmatch(mappedValue, resourceComponent.bitmatch);
            }
            var valueComponent = new AnnotatedTlv_1.DefaultAnnotatedTlvComponent(name, selector, triggered, value);
            valueComponents.push(valueComponent);
        }
        return valueComponents;
    };
    ResourceBasedAnnotationProvider.prototype.findItemWithTag = function (tag) {
        for (var i = 0; i < this.resource.items.length; i++) {
            var item = this.resource.items[i];
            if (item.tag === tag) {
                return item;
            }
        }
        return null;
    };
    return ResourceBasedAnnotationProvider;
})();
exports.ResourceBasedAnnotationProvider = ResourceBasedAnnotationProvider;
