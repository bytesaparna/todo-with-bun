import { describe, expect, test } from "bun:test";
import { getAccessToken } from "../function";
import updateTask from "../../api/update";


describe("Update Task", () => {
    test("Update Task by giving access token for verification, task id  to be updated in params and title in body and return 200 ", async () => {
        const accessToken = await getAccessToken({ id: "6d9e24ae-0afe-40da-9ce3-c938adfbebe6", email: "Jeffery Batz", password: "frbQiyja2wnLu59" });
        //add one task id of the user
        const id = "44b629e3-7ffa-4bed-9728-be4b098582a6";

        const req = new Request(`http://localhost:3000/update/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },

            body: JSON.stringify({
                title: "New Task from testign"
            })
        })

        const res = await updateTask(req, id);
        const data = await res.json() as { message: string };

        expect(res.status).toBe(200);
        expect(data.message).toBe("Task updated successfully");
    })
})
