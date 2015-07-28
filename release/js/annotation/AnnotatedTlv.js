var DefaultAnnotatedTlv = (function () {
    function DefaultAnnotatedTlv(tag, type, rawValue, mappedValue, name, description, reference, format, components) {
        if (mappedValue === void 0) { mappedValue = null; }
        if (name === void 0) { name = null; }
        if (description === void 0) { description = null; }
        if (reference === void 0) { reference = null; }
        if (format === void 0) { format = null; }
        if (components === void 0) { components = null; }
        this.tag = tag;
        this.type = type;
        this.rawValue = rawValue;
        this.mappedValue = mappedValue;
        this.name = name;
        this.description = description;
        this.reference = reference;
        this.format = format;
        this.components = components;
        this.items = null;
    }
    return DefaultAnnotatedTlv;
})();
exports.DefaultAnnotatedTlv = DefaultAnnotatedTlv;
var DefaultAnnotatedTlvComponent = (function () {
    function DefaultAnnotatedTlvComponent(name, selector, triggered, value) {
        this.name = name;
        this.selector = selector;
        this.triggered = triggered;
        this.value = value;
    }
    return DefaultAnnotatedTlvComponent;
})();
exports.DefaultAnnotatedTlvComponent = DefaultAnnotatedTlvComponent;
