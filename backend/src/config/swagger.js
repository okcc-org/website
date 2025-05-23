const path = require('path');
const YAML = require('yamljs');

const swaggerDocument = YAML.load(path.join(__dirname, '../docs/openapi.yaml'));

module.exports = swaggerDocument;
