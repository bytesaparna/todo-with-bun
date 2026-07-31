import { hashPassword } from "../../src/function";
import type { USER } from "../../src/types";

export default async function registerUser(req: Request) {
    const { email, password } = await req.json() as USER;

    const path = "./app/src/data/users.json";
    const file = Bun.file(path);
    if (!file) {
        return Response.json({
            message: "File not found"
        },
            { status: 404 }
        )
    }

    const fileContent = await file.json();
    const id = crypto.randomUUID();
    const hashedPassword = await hashPassword(password);
    fileContent.users.push({ id, email,password: hashedPassword });

    Bun.write(path, JSON.stringify(fileContent, null, 2));

    return Response.json({
        message: "User Registered successfully"
    },
        { status: 201 }
    )
}