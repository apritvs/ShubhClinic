const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Subh Clinic',
      version: '1.0.0',
      description: 'API documentation using Swagger for subh clinic',
    },
  },
  apis: ['./Routes/*.js'], 
};


const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi,
};