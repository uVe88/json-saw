const AjvValidator = require("./ajvSchemaValidator");

const defaultOptions = {};
const validators = {};

exports.setDefaultOptions = options => Object.assign(defaultOptions, options);

exports.getValidator = name => {
  let validator = validators[name];

  if (!validator) {
    validator = new AjvValidator(null, defaultOptions);
    validators[name] = validator;
  }

  return validator;
};

exports.registerSchemas = (name, schemas, options = {}) => {
  let validator = validators[name];

  if (!validator) {
    validator = new AjvValidator(schemas, { ...defaultOptions, ...options });
    validators[name] = validator;
  } else {
    validator.addSchemas(schemas);
  }

  return validator;
};
