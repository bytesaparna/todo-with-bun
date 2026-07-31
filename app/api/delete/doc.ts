export const deletePath = {
    // Add your API paths here
    '/api/delete': {
        delete: {
            summary: "Deleting a Task",
            description: "Delete your task by verifyinh through access token",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["id"],
                            properties: {
                                id: {
                                    type: "string",
                                    description: "The id of the task to delete"
                                }
                            }
                        }
                    }
                }
            },
            security: [{ bearerAuth: [] }],
            responses: {
                '204': {
                    description: 'Task Deleted successfully',
                },
            }
        }
    }
}

