import { getAccessToken } from "../../src/function";
import type { USER } from "../../src/types";

export default async function loginUser(req: Request) {
    const { email, password } = await req.json() as USER;

    const path = "./app/src/data/users.json";
    const file = Bun.file(path);
    const fileContent = await file.json();

    const user = fileContent.users.find((user: USER) => user.email == email);

    if (!user) {
        return Response.json({ message: "Username not found" }, { status: 401 });
    }

    if (user.password != password) {
        return Response.json({ message: "Password Incorrect" }, { status: 401 });
    }

    //when user login, it should get access token to check future req authorization by this user
    const accessToken = await getAccessToken(user, "1h");
    return Response.json({ message: "Login successful. Your access token is", accessToken }, { status: 200 });
}