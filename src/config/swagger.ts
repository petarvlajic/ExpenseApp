const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description: "API documentation for your Express.js app",
    },
  },
  apis: ["../controllers/*.ts"], // Path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
