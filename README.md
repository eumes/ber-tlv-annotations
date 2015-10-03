# ber-tlv-annotations

[![npm version](https://badge.fury.io/js/ber-tlv-annotations.svg)](https://www.npmjs.com/package/ber-tlv-annotations)
[![travis status](https://travis-ci.org/eumes/ber-tlv-annotations.svg?branch=develop)](https://travis-ci.org/eumes/ber-tlv-annotations)

> Annotating TLV data with descriptions and value mappings

This library adds additional metadata to TLV items created with the [ber-tlv](https://www.npmjs.com/package/ber-tlv-annotations) ([github](https://github.com/eumes/ber-tlv)) package.

## Usage

### Importing the Module

```js
//typescript
import { ITlv, TlvType, TlvClass } from './node_modules/ber-tlv/src/Tlv.ts';
import { TlvFactory, IParseError } from './node_modules/ber-tlv/src/TlvFactory.ts';
import { AnnotationRegistry } from './node_modules/ber-tlv-annotations/src/AnnotationRegistry.ts';

//javascript
var tlv = require('ber-tlv');
var annotations = require('ber-tlv-annotations');
var TlvType = tlv.TlvType;
var TlvFactory = tlv.TlvFactory;
var AnnotationRegistry = annotations.AnnotationRegistry;
```

### Annotating Tlv

```js
//generate your tlv array (i.e. TlvFactory.parse(...))
var tlvs = ...;
//or a single item (i.e. TlvFactory.primitiveTlv(...))
var tlv = ...;

//setup the annotation registry
var registry = new AnnotationRegistry();
//register the pre-packaged providers
registry.registerPackagedProviders();

//lookup a single tlv item, returns <IAnnotatedTlv>
var lookup = registry.lookupAnnotation(tlv);
//or an array of tlv items, returns <IAnnotatedTlv[]>
var lookups = registry.lookupAnnotations(tlvs);
```

#### IAnnotatedTlv
```js
interface IAnnotatedTlv {
    tag: string;
    type: TlvType;
    rawValue: string;
    mappedValue: string;
    items: IAnnotatedTlv[];

    name: string;
    description: string;
    reference: string;
    format: string;
    components: IAnnotatedTlvComponent[];
}
interface IAnnotatedTlvComponent {
    selector: string;
    name: string;
    triggered: boolean;
    value: string;
}
```

> Note: There is also a possibility to add additional mappers, documentation for this will follow!

## Examples

### Country Code Mapping
```js
//this is the emv terminal country code
var tlv = TlvFactory.primitiveTlv("9F1A", "0276");
var lookup = registry.lookupAnnotation(tlv);

//lookup is
{
    tag: "9F1A",
    type: 0, //PRIMITIVE (TlvType[type])
    rawValue: "0276",
    mappedValue: "0276",
    items: [],

    name: "Terminal Country Code",
    description: "Indicates the country of the terminal, represented according to ISO 3166",
    reference: "EMV",
    format: "NUMERIC",
    components: [
        {
            selector: "0276",
            name: "ISO_3166",
            triggered: true,
            value: "Germany (DE)"
        }
    ];
}
```

### Mapping with Bitmatches
```js
//this is the emv application interchange profile
var tlvs = TlvFactory.parse("82020700");
var lookups = registry.lookupAnnotations(tlvs);

//lookup is
[
    {
        tag: "82",
        type: 0, //PRIMITIVE (TlvType[type])
        rawValue: "0700",
        mappedValue: "0700",
        items: [],

        name: "Application Interchange Profile",
        description: "Indicates the capabilities of the card to support specific functions in the application",
        reference: "EMV",
        format: "VARIABLE_BYTES",
        components: [
            {
                selector: "1&7",
                name: "SDA supported",
                triggered: false,
                value: null
            },
            {
                selector: "1&6",
                name: "DDA supported",
                triggered: false,
                value: null
            },
            {
                selector: "1&5",
                name: "Cardholder verification is supported",
                triggered: false,
                value: null
            },
            {
                selector: "1&4",
                name: "Terminal risk management is to be performed",
                triggered: false,
                value: null
            },
            {
                selector: "1&3",
                name: "Issuer authentication is supported",
                triggered: true,
                value: null
            },
            {
                selector: "1&1",
                name: "CDA supported",
                triggered: true,
                value: null
            },
            {
                selector: "2&8",
                name: "RFU (Contactless)",
                triggered: false,
                value: null
            }
        ];
    }
]
```

## Development

### Prerequisites

The project is build on `Typescript` for strong javascript typing and uses `DefinitelyTyped` for downloading typescript definitions for development dependencies. In the end, everything is glued together by `Gulp`.

```bash
//global dependencies
npm install gulp -g
npm install typescript -g
npm install tsd -g
//and now the local dependencies
npm install
```

### Build

```bash
gulp build
```

> Note: The ts.d file for the resulting javascript is currently created manually after the build.

### Test

```bash
gulp test
```

## License
```
The MIT License (MIT)

Copyright (c) 2015 Simon Eumes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
