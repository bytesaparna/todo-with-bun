import { describe, expect, test } from "bun:test";
import add from "../../api/add";
import { getAccessToken } from "../function";


describe("Add Task", () => {
    test("Add Task by giving access token for verification and return 201 ", async () => {
        const accessToken = await getAccessToken({id:"some-user-id", email: "test@example.com", password: "secret123" });
        
        const req = new Request("http://localhost:3000/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },

            body: JSON.stringify({
                title: "Exercise"
            })
        })

        const res = await add(req);
        const data = await res.json() as { message: string };

        expect(res.status).toBe(201);
        expect(data.message).toBe("Task Added successfully");
    })
})