import type { QueryResult } from "pg";
import { query } from "../config/db.js";
import { type Cafe } from "../types/cafe.js";

export class CafeRepository {
  async fetchAll(limit?: number): Promise<Cafe[] | null> {
    const sql = `
      SELECT
        id,
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
        id,
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

  async addCafe(cafe: Cafe): Promise<string> {
    try {
      const formattedName = cafe.name.toLowerCase();
      const sql = `
        insert into cafes(cafe_name, cafe_description, cafe_location)
        values($1, $2, ST_PointFromText('POINT(' || $3::text || ' ' || $4::text || ')', 4326))
        `;
      const res = await query(sql, [
        formattedName,
        cafe.description,
        cafe.longitude,
        cafe.latitude,
      ]);
      return "Sucessfully inserted cafe";
    } catch (error) {
      throw error;
    }
  }

  async deleteCafe(cafeName: string): Promise<string> {
    try {
      const formattedName = cafeName.toLowerCase();
      const sql = `
        delete from cafes
        where cafe_name = $1
        `;
      await query(sql, [formattedName]);
      return "Successfull deleted cafe";
    } catch (error) {
      throw error;
    }
  }
}
