
import deleteTask from "./app/api/delete";
import getTasks from "./app/api/get";
import registerUser from "./app/api/register";
import loginUser from './app/api/login';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import health from './app/api/health';
import add from "./app/api/add";
import pino from "pino";


const app = new Hono;

const logger = pino({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    transport: process.env.NODE_ENV !== "production"
        ? { target: "pino-pretty", options: { colorize: true } }
        : undefined,
});

logger.info("🚀Logger Server running!");


app.use("*", async (c, next) => {
    const start = Date.now();

    // Clone so reading the body here doesn't consume it for the handler
    const body = await c.req.raw.clone().text().catch(() => "<unreadable>");

    try {
        const loggerChild = logger.child({
            method: c.req.method,
            path: c.req.path,
        })

        loggerChild.info({
        }, "Incoming request");

        await next();

        loggerChild.info({
            status: c.res.status,
            body: body,
            duration: `${Date.now() - start}ms`
        }, "Request Completed")

    } catch {

        logger.error("❌ Error occurred!");
    }
});


app.use("*", cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
}));

app.get("/", (c) => c.text("Welcome to TODO app using bun"));
app.get("/api/health", (c) => health(c.req.raw));
app.post("/api/add", (c) => add(c.req.raw));
app.delete("/api/delete", (c) => deleteTask(c.req.raw));
app.get("/api/get", (c) => getTasks(c.req.raw));
app.post("/api/register", (c) => registerUser(c.req.raw));
app.post("/api/login", (c) => loginUser(c.req.raw));



const server = Bun.serve({
    port: 3000,
    // routes: {
    //     "/": () => new Response('Bun!'),
    //     "/api/health": { GET: health },
    //     "/api/add": { POST: add },
    //     "/api/delete": { DELETE: deleteTask },
    //     "/api/get": { GET: getTasks },
    //     "/api/register": { POST: registerUser },
    //     "/api/login": { POST: loginUser },

    // },
    fetch: app.fetch
});

console.log(`Listening on ${server.url}`);