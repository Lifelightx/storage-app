import {z} from "zod";

export const createUploadSchema = 
    z.object({
        filename: z
            .string()
            .min(1)
            .max(255),
        
        size: z 
            .number()
            .positive()
            .max(
                5 * 1024 * 1024 * 1024
            )
    })