export const healthPath = {
    // Add your API paths here
    '/api/health': {
        get: {
            summary: 'Health check',
            responses: {
                '200': {
                    description: 'OK',
                },
            },
        },
    },
}

