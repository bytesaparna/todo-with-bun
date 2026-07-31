export const updatePath = {
    // Add your API paths here
    '/api/update/{id}': {
        patch: {
            summary: "Updating a Task",
            description: "Update your task by verifying through access token",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "The id of the task to update",
                    schema: {
                        type: "string"
                    }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["title"],
                            properties: {
                                title: {
                                    type: "string",
                                    description: "The updated title of the task "
                                }
                            }
                        }
                    }
                }
            },
            security: [{ bearerAuth: [] }],
            responses: {
                '200': {
                    description: 'Task updated successfully',
                },
            }
        }
    },
}

