import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";
dotenv.config();

const doc = {
  info: {
    title: "MLBP",
    version: "1.0.0",
    description: "MLBP API Server endpoints",
    contact: {
      name: "Danish Gakhar",
    },
  },
  schemes: ["http"],
  servers: [
    {
      url: process.env.BACKEND_URL,
    },
  ],
  security: [
    {
      bearerAuth: [],
    },
  ],
  securityDefinitions: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
  tags: [
    {
      name: "Authentication",
    },
  ],
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./index.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
