const ajvValidator = require('./ajvSchemaValidator');

const validators = {}

module.exports.getValidator = (name) => {
    let validator = validators[name]

    if (!validator) {
        validator = new ajvValidator();
        validators[name] = validator;
    }

    return validator;
}

module.exports.registerSchemas = (name, schemas) => {
    let validator = validators[name];

    if (!validator) {
        validator = new ajvValidator(schemas);
        validators[name] = validator;
    } else {
        validator.addSchemas(schemas);
    }

    return validator;
}