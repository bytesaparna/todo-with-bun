import { describe, expect, test } from "bun:test";
import deleteTask from "../../api/delete";
import { getAccessToken } from "../function";


describe("Delete Task", () => {
    test("Delete Task by giving access token for verification and return 200 ", async () => {
        const accessToken = await getAccessToken({ id: "some-user-id", email: "test@example.com", password: "secret123" });

        const req = new Request("http://localhost:3000/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },

            body: JSON.stringify({
                id: "f7b6feac-9c50-4132-821a-9e27ffa5916c"
            })
        })

        const res = await deleteTask(req);
        const data = await res.json() as { message: string };

        expect(res.status).toBe(200);
        expect(data.message).toBe("Task deleted successfully");
    })
})
