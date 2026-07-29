import { describe, expect, test } from "bun:test";
import health from "../../api/health";


describe("Health Status", () => {
    test("Check server health status and return 200 ", async () => {
        const req = new Request("http://localhost:3000/health")

        const res = await health(req);

        expect(res.status).toBe(200);
    })
})