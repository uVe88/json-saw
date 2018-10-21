const Ajv = require("ajv");
const ValidationError = require("./validationError");

class JsonSchemaValidator {
  constructor(schemas, { version, ...ajvOptions } = {}) {
    this.ajv = new Ajv({ schemaId: "auto", allErrors: true, ...ajvOptions });

    if (version) {
      (Array.isArray(version) ? version : [version]).forEach(v =>
        this.ajv.addMetaSchema(
          require(`ajv/lib/refs/json-schema-draft-0${v}.json`)
        )
      );
    }

    if (schemas) {
      this.addSchemas(schemas);
    }
  }

  addSchemas(schemas) {
    if (Array.isArray(schemas)) {
      schemas.forEach(element => this.ajv.addSchema(element));
    } else {
      this.ajv.addSchema(schemas);
    }
  }

  validate(data, schema) {
    return new Promise((resolve, reject) => {
      let valid = this.ajv.validate(schema, data);

      if (!valid) {
        return reject(new ValidationError(this.ajv.errors));
      }

      return resolve();
    });
  }
}

module.exports = JsonSchemaValidator;
