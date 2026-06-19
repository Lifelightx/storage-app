import { buildApp } from "./app.js";
import "dotenv/config"
const app = await buildApp();

try{
    await app.listen({
        host: "0.0.0.0",
        port: 3000
    });
    console.info("server started")
}catch (error){
    app.log.error(error)
    process.exit(1)
}