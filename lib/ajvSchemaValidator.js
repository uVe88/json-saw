const Ajv = require('ajv');
const ValidationError = require('./validationError');

class JsonSchemaValidator {
    
    constructor(schemas) {
        this.ajv =  new Ajv({ 'allErrors': true });
        
        if (schemas) {
            this.addSchemas(schemas);
        }
    }

    addSchemas(schemas) {
        if (Array.isArray(schemas)) {
            schemas.forEach(function(element) {
                this.ajv.addSchema(element);
            }, this);
        } else {
            this.ajv.addSchema(schemas)
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