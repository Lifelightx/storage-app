import { randomUUID } from "crypto";
import pool from "../../config/database.js";
class UploadRepository{
    async create({
        filename,
        totalSize,
        chunkSize
    }){
        const id = randomUUID();
        const query = `
            INSERT INTO uploads (
        id,
        filename,
        total_size,
        chunk_size,
        status
      )
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
        `
      const values = [
        id,
        filename,
        totalSize,
        chunkSize,
        "PENDING"
      ]

      const result = await pool.query(query, values);
      return result.rows[0];
    }
}

export default new UploadRepository();