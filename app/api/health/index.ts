const startedAt = Date.now();

export default async function health(req: Request){
    const body = {
        status: "ok",
        uptime: (Date.now() - startedAt) / 1000,
        timestamp: new Date().toISOString(),
        memory: process.memoryUsage.rss(),
        bun: Bun.version,
    };

    return Response.json(body, {
        status: 200,
        headers: { "Cache-Control": "no-store" },
    });
}
