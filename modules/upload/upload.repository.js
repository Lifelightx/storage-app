import { randomUUID } from "crypto";
import pool from "../../config/database.js";

class UploadRepository {
    async create({
        uploadId,
        filename,
        totalSize,
        chunkSize,
        totalParts
    }) {

        
        const query = `
            INSERT INTO uploads (
                id,
                filename,
                total_size,
                chunk_size,
                total_parts,
                status
            )
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6
            )
            RETURNING *
        `;

        const values = [
            uploadId,
            filename,
            totalSize,
            chunkSize,
            totalParts,
            "PENDING"
        ];

        const result =
            await pool.query(
                query,
                values
            );

        return result.rows[0];
    }

    async findById(uploadId){
        const result = await pool.query(
            `SELECT * FROM uploads WHERE id = $1`,
            [uploadId]
        )
        return result.rows[0]
    }

    async updateStatus(uploadId, status){
        await pool.query(
            `   
            UPDATE uploads 
            SET status = $2
            WHERE id = $1
            `,
            [uploadId, status]
        );
    }
    
    async incrementUploadedSize(
        uploadId,
        bytes
    ){
        await pool.query(
            `
            UPDATE uploads 
            SET uploaded_size = uploaded_size + $2
            WHERE id = $1
            `,
            [uploadId, bytes]
        )
    }
}

export default new UploadRepository();