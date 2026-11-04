import type { Request, Response } from "express";

export function login(req: Request, res: Response) {
    res.json({
        token: "123456"
    })
};