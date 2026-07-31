import { checkAuth } from "../../src/function";
import type { TASK } from "../../src/types";

export default async function deleteTask(req: Request) {
    //only authorized users may delete
    const auth = await checkAuth(req);
    if ("error" in auth) {
        return auth.error;
    }
    const userId = auth.payload.id;

    //read the body
    const { id } = (await req.json()) as { id: string };

    if (!id) {
        return Response.json({ message: "Task Id not found" }, { status: 400 });
    }


    const path = "./app/src/data/tasks.json";
    const file = Bun.file(path);
    const fileContent = await file.json();

    const tasks = fileContent.tasks
    const delTask = tasks.find((task: TASK) => task.id == id);
    if (!delTask) {
        return Response.json({ message: "Task not found" }, { status: 404 });
    }
    if (delTask.userId != userId) {
        return Response.json({ message: "You are not allowed to delete this task. It belongs to someone else" }, { status: 403 });
    }


    const updatedTasks = tasks.filter((task: TASK) => task.id != id);

    fileContent.tasks = updatedTasks;



    //write it to the json file
    await Bun.write(path, JSON.stringify(fileContent, null, 2));

    return Response.json({ message: "Task deleted successfully" }, { status: 204, });

}