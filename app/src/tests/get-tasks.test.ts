import { describe, expect, test } from "bun:test";
import { getAccessToken } from "../function";
import getTasks from "../../api/get";
import type { TASK } from "../types";


describe("Get Tasks List", () => {
    test("Get list of task of the user by giving access token and return 200", async () => {
        const accessToken = await getAccessToken({ id: "some-user-id", email: "test@example.com", password: "secret123" });

        const req = new Request("http://localhost:3000/get", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
        })

        const res = await getTasks(req);
        const data = await res.json() as { message: string, tasks: TASK[] };

        expect(res.status).toBe(200);
        expect(data.message).toBe("Tasks list for the user");
    })
})