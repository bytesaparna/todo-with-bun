export const addPath = {
    // Add your API paths here
    '/api/add': {
        post: {
            summary: "Adding a Task",
            description: "Add a task for yourself by verifyinh through access token",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Task"
                        }
                    }
                }
            },
            security: [{ bearerAuth: [] }],
            responses: {
                '201': {
                    description: 'Task Added successfully',
                },
            }
        }
    },
}

