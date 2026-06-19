import fs from "fs/promises";
import path from "path";

import pool from "../config/database.js";




async function migrate() {
  const migrationPath = path.resolve(
    "./migrations/001_initial.sql"
  );

  const sql = await fs.readFile(
    migrationPath,
    "utf8"
  );

  try {
    await pool.query("BEGIN");

    await pool.query(sql);

    await pool.query("COMMIT");

    console.log("Migration successful");
  } catch (err) {
    await pool.query("ROLLBACK");

    console.error(err);
  } finally {
    await pool.end();
  }
}

migrate();