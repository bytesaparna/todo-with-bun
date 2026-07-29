import { describe, expect, test } from "bun:test";
import loginUser from "../../api/login";


describe("User Login", () => {
    test("Login with email and password and returns 200", async () => {
const req = new Request("http://localhost:3000/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    
    body: JSON.stringify({
        email: "test@example.com",
        password: "secret123",
    })
})

        const res = await loginUser(req);
        const data = await res.json() as { message: string; accessToken: string };

        expect(res.status).toBe(200);
        expect(data.message).toBe("Login successful. Your access token is");
        expect(data.accessToken).toBeString();
        expect(data.accessToken.length).toBeGreaterThan(0);
    })
})