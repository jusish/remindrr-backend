import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Remindrr API Documentation",
      version: "1.0.0",
      description: "API documentation for Remindrr application",
    },
    servers: [
      {
        url: "http://localhost:8000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Reminder: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            title: {
              type: "string",
            },
            description: {
              type: "string",
            },
            due_date: {
              type: "string",
              format: "date-time",
            },
            isEmergent: {
              type: "boolean",
            },
            isFavorite: {
              type: "boolean",
            },
            user: {
              type: "string",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"], // Ensure this path is correct
};

const specs = swaggerJsdoc(options);

export default specs;
