import { app } from "./server/server.ts";

app.listen(3000, async () => {
    console.log("Listening on port 3000...");
})