import express, { type Express } from "express";

//Create express app
const app: Express = express();
app.use(express.json())

import { login } from "../auth/routes.ts";
app.post("/auth/login", login)

export { app };