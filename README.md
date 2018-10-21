# json-saw [![npm](https://img.shields.io/npm/v/json-saw.svg)](https://www.npmjs.com/package/json-saw) [![npm](https://img.shields.io/npm/dy/json-saw.svg)](https://www.npmjs.com/package/json-saw) [![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/json-saw.svg)](https://www.npmjs.com/package/json-saw)

> Json Schema Validator Helper

![saw](https://images.unsplash.com/photo-1513467655676-561b7d489a88?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4c9c7415bbba61b025f75d69c8c4ed5e&auto=format&fit=crop&w=890&q=80)

## Features

- Multiple schema dependencies
- Multiple Json Schema versions
- Validation with promises

## Install

```
$ npm install json-saw --save
```

## Usage

```js
const saw = require("json-saw")
saw.setDefaultOptions({ version: 4 }) // support ajv options https://github.com/epoberezkin/ajv#options

saw.registerSchemas('name', schema1)
saw.registerSchemas('name', schema2)

const validator = saw.getValidator('name')

(async () => {
    const invalid = await validator.validate(data, schema)
    if (invalid) console.log(invalid.errors);
})()

```