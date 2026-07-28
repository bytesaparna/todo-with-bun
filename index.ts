
import deleteTask from "./app/api/delete";
import getTasks from "./app/api/get";
import registerUser from "./app/api/register";
import loginUser from './app/api/login';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import health from './app/api/health';
import add from "./app/api/add";


const app = new Hono;

app.use("*", logger());
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