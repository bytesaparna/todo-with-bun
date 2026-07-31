export const getPath = {
    // Add your API paths here
    '/api/get': {
        get: {
            summary: "List of Tasks of User",
            description: "Get the list of your tasks by verifying through access token",
            security: [{ bearerAuth: [] }],
            responses: {
                '200': {
                    description: 'Tasks listed',
                },
            }
        }
    },
}

