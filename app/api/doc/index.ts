// OpenAPI 3.0 document describing the TODO app API.

import { addPath } from "../add/doc";
import { deletePath } from "../delete/doc";
import { getPath } from "../get/doc";
import { healthPath } from "../health/doc";
import { loginPath } from "../login/doc";
import { registerPath } from "../register/doc";
import { updatePath } from "../update/doc";

// Served as raw JSON at /doc and rendered by Swagger UI at /ui (see index.ts).
export const openApiDoc = {
    openapi: '3.0.0',
    info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'API documentation for TODO app',
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
        schemas: {
            User: {
                type: "object",
                required: ["email", "password"],
                properties: {
                    email: {
                        type: "string",
                        format: "email",
                    },
                    password: {
                        type: "string",
                        format: "password",
                    },
                },
            },
            Task: {
                type: "object",
                required: ["title"],
                properties: {
                    title: {
                        type: "string",
                        format: "title",
                    },
                },
            },
        },
    },
    paths: {
        ...healthPath,
        ...addPath,
        ...deletePath,
        ...getPath,
        ...updatePath,
        ...registerPath,
        ...loginPath,
    },
}
