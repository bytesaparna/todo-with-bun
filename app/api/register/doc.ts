import { userSchema } from "../../src/types";

export const registerPath = {
    // Add your API paths here
    '/api/register': {
        post: {
            summary: "Register User",
            description: "Register with emai land password",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/User"
                        }
                    }
                }
            },
            responses: {
                '201': {
                    description: 'User Registered successfully',
                },
            }
        }
    },
}

