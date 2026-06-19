import fp from "fastify-plugin";
import pool from "../config/database.js";

async function postgresPlugin(fastify) {
    fastify.decorate("db", pool)

    fastify.addHook("onClose", async ()=>{
        await pool.end();
    })
}

export default fp(postgresPlugin)