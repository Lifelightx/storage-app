import Fastify from 'fastify';
import uploadRoutes from "./modules/upload/upload.route.js"
import { logger } from './config/logger.js';


import postgresPlugin from './plugins/postgres.js';

export async function buildApp(){
    const app = Fastify({
        logger: logger
    })

    await app.register(postgresPlugin);

    await app.register(uploadRoutes, {
        prefix: "/api/upload",
    })

    return app;
    
}