import type { QueryResult } from "pg";
import { query } from "../config/db.js";
import { type Cafe } from "../types/cafe.js";

export class CafeRepository {
  async fetchAll(limit?: number): Promise<Cafe[] | null> {
    const sql = `
      SELECT
        cafe_name as name,
        cafe_description as description,
        ST_X(cafe_location) as longitude,
        ST_Y(cafe_location) as latitude
      FROM cafes ${limit ? "limit $1" : ""}
      `;

    const res = limit ? await query(sql, [limit]) : await query(sql);

    return res.rows as Cafe[];
  }

  async fetchBySubstr(substr: string): Promise<Cafe[] | null> {
    const formattedSubstr = substr.toLowerCase();
    const sql = `
      SELECT
        cafe_name as name,
        cafe_description as description,
        ST_X(cafe_location) as longitude,
        ST_Y(cafe_location) as latitude
      FROM cafes where cafe_name like concat('%', $1::text, '%')
      `;
    const res = formattedSubstr
      ? await query(sql, [formattedSubstr]).then(
          (response: QueryResult) => response.rows,
        )
      : null;

    return res;
  }
}
