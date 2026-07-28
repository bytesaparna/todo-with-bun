//to create access token we should have header,payload and signation

import { jwtVerify, SignJWT, type JWTHeaderParameters, type JWTPayload, type JWTVerifyResult } from "jose";

// Also add expiry to give refresh token 
export async function getAccessToken(payload: JWTPayload, expiry?: string) {
    const jwtHeaderPayload = new SignJWT(payload).setProtectedHeader({
        alg: "HS256",
        typ: "JWT"
    })

    //set expiry if you want arefresh token setuup
    if (expiry) {
        jwtHeaderPayload.setExpirationTime(expiry);
    }

    //add signature
    const generatedToken = await jwtHeaderPayload.sign(new TextEncoder().encode(process.env.JWT_SECRET_KEY));
    return generatedToken;

}


export async function checkAuth(req: Request): Promise<{ payload: JWTPayload } | { error: Response }> {
    const authHeader = req.headers.get("authorization");
    const jwtToken = authHeader && authHeader.split(" ")[1];

    if (!jwtToken) {
        return { error: Response.json({ message: "Token not received" }, { status: 401 }) };
    }
    try {
        const { payload } = await jwtVerify(jwtToken, new TextEncoder().encode(process.env.JWT_SECRET_KEY));
        return { payload };
    } catch (err: any) {
        console.error("JWT verify failed:", err?.code, err?.message);
        return {
            error: Response.json(
                { message: "Error validating token", reason: err?.code ?? err?.message },
                { status: 401 }
            ),
        };
    }
}

