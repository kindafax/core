import type { Database }  from "./types.d.ts";
import { createPool } from "mysql2"
import { Kysely, MysqlDialect } from "kysely"

const dialect = new MysqlDialect({
    pool: createPool({
        database: "kindafax_dev",
        host: "localhost",
        user: "root",
        password: "",
    })
})

export const db = new Kysely<Database>({dialect});
