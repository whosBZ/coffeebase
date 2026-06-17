import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log(`Execute Query: ${text} [${duration}ms]`);
    return res;
  } catch (error) {
    if (error.code === "23505") {
      throw Error("Duplicate error caught");
    }
    throw error;
  }
};
