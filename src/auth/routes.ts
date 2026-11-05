import { readFileSync } from "node:fs"
import type { Request, Response } from "express";
import type { LoginTokenRequest, ErrorMessage } from "./types.js";
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import { db } from "../database/database.ts";
import { randomUUID } from "node:crypto";


const DEFAULT_EXPIRY = 7;
const InvalidCredentials: ErrorMessage = {
    code: 401,
    message: "Invalid Credentials"
}

const InvalidSyntax: ErrorMessage = {
    code: 400,
    message: "The body of this request is invalid."
}

export async function login(req: Request, res: Response) {
    const now = new Date(Date.now())
    let identity: LoginTokenRequest;
    try{
        identity = {
            name: req.body.name,
            password: req.body.password,
            expiry: req.body.expiry ?? DEFAULT_EXPIRY
        }
    }
    catch (e) {
        res.status(InvalidCredentials.code).json(InvalidCredentials);
        return;
    }

    const user = await db.selectFrom("user")
        .select(["id", "password", "displayName"])
        .where("displayName", "=", identity.name)
        .executeTakeFirst();
    

    if (!user){
        res.status(InvalidCredentials.code).json(InvalidCredentials);
        return;
    };

    if (!await bcryptjs.compare(identity.password, user.password)){
        res.status(InvalidCredentials.code).json(InvalidCredentials);
        return;
    };

    const clientID = randomUUID();
    const expiry = now.setHours(now.getHours() * identity.expiry)
    const signingKey = readFileSync("utils/keys/private-insecure.pem")
    const token = jwt.sign(
        {
            id: user,
            clientID: clientID,
            expiry: expiry       
        },
        signingKey,
        {algorithm: "RS256"}
    );

    db.insertInto("userSession")
        .columns(["id", "user", "token", "createdAt", "expiresAt", "isBot"])
        .values({
            id: clientID,
            user: user.id,
            token: token,
            createdAt: new Date(Date.now()),
            expiresAt: new Date(expiry),
            isBot: false
        })
        .execute()

    res.json({
        token: token,
        expiry: new Date(expiry),
    })

};