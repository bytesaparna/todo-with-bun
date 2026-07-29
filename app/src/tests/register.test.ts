import { describe, expect, test } from "bun:test";
import registerUser from "../../api/register";

describe("User Registration", () => {
    test("Register with username and password and returns 201", async () => {
        const req = new Request("http://localhost:3000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: "test@example.com",
                password: "secret123",
            })
        })

        const res = await registerUser(req);
        const data = await res.json() as { message: string };

        expect(res.status).toBe(201);
        expect(data.message).toBe("User Registered successfully");

    })
})