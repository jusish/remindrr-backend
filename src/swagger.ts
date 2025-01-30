import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Remindrr API Documentation',
      version: '1.0.0',
      description: 'API documentation for Remindrr application',
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.ts'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

export default specs;