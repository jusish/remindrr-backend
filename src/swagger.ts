import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Remindrr API",
      version: "1.0.0",
      description: "API documentation for the Remindrr app",
    },
    servers: [
      {
        url: "http://localhost:8000/api/v1",
        description: "Development Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        refreshTokenAuth: {
          type: "apiKey",
          in: "cookie",
          name: "refreshToken",
        },
      },
      responses: {
        UnauthorizedError: {
          description: "Unauthorized. Token is missing or invalid",
        },
        InternalServerError: {
          description: "Internal Server Error",
        },
      },
    },
  },
  apis: ["./routes/*.ts"],
};

const swaggerDocs = swaggerJSDoc(options);

export default (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
