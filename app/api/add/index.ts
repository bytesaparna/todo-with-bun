import type { errors } from "jose";
import type { TASK } from "../../src/types";
import { checkAuth } from "../../src/function";

export default async function add(req: Request) {
    const auth = await checkAuth(req);

    if ("error" in auth) {
        return auth.error;
    }

    const userId = auth.payload.id;

    //read the body
    const { title } = await req.json() as TASK;
    const taskId = crypto.randomUUID();

    const path = "./app/src/data/tasks.json";
    const file = Bun.file(path);
    const fileContent = await file.json();

    fileContent.tasks.push({ taskId, title, userId });



    //write it to the json file
    await Bun.write(path, JSON.stringify(fileContent, null, 2));


    return Response.json({ message: "Task Added successfully" }, { status: 201, });

}