var AnnotatedTlv = require('../release/js/annotation/AnnotatedTlv');
var AnnotationProvider = require('../release/js/provider/AnnotationProvider');
var AnnotationRegistry = require('../release/js/AnnotationRegistry');

var BerTlvAnnotations = {};
//AnnotatedTlv
BerTlvAnnotations.IAnnotatedTlv = AnnotatedTlv.IAnnotatedTlv;
BerTlvAnnotations.IAnnotatedTlvComponent = AnnotatedTlv.IAnnotatedTlvComponent;
//AnnotationProvider
BerTlvAnnotations.IAnnotationProvider = AnnotationProvider.IAnnotationProvider;
//AnnotationRegistry
BerTlvAnnotations.IAnnotationRegistry = AnnotationRegistry.IAnnotationRegistry;
BerTlvAnnotations.AnnotationRegistry = AnnotationRegistry.AnnotationRegistry;

module.exports = BerTlvAnnotations;
