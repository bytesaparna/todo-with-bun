import { checkAuth } from "../../src/function";
import type { TASK } from "../../src/types";

export default async function updateTask(req: Request, id: string) {
    //only authorized users may delete
    const auth = await checkAuth(req);
    if ("error" in auth) {
        return auth.error;
    }
    const userId = auth.payload.id;

    if (!id) {
        return Response.json({ message: "Task Id not found" }, { status: 400 });
    }


    //read the body
    const { title } = (await req.json()) as { title: string };

    const path = "./app/src/data/tasks.json";
    const file = Bun.file(path);
    const fileContent = await file.json();

    const tasks = fileContent.tasks
    const updateTask = tasks.find((task: TASK) => task.id == id);

    if (!updateTask) {
        return Response.json({ message: "Task not found" }, { status: 404 });
    }
    if (updateTask.userId != userId) {
        return Response.json({ message: "You are not allowed to update this task. It belongs to someone else" }, { status: 403 });
    }

    updateTask.title = title;

    //write it to the json file
    await Bun.write(path, JSON.stringify(fileContent, null, 2));

    return Response.json({ message: "Task updated successfully" }, { status: 200, });

}