export const loginPath = {
    // Add your API paths here
    '/api/login': {
        post: {
            summary: "Login User",
            description: "Login with emai land password",
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
                '200': {
                    description: 'Login successfully'
                },
            }
        }
    },
}

