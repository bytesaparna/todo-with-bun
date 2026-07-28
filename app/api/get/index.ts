import { checkAuth } from "../../src/function";
import type { TASK } from "../../src/types";

export default async function getTasks(req: Request) {
    const auth = await checkAuth(req);

    if ("error" in auth) {
        return auth.error;
    }

    const userId = auth.payload.id;

    const path = "./app/src/data/tasks.json";
    const file = Bun.file(path);
    const fileContent = await file.json();

    const tasks = fileContent.tasks.filter((task: TASK) => (task.userId == userId));


    return Response.json({ message: "Tasks list for the user", tasks }, { status: 200, });

}