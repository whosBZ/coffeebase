import type { QueryResult } from "pg";
import { query } from "../config/db.js";
import { type Cafe, type NewCafe } from "../schemas/cafe.schema.js";

export class CafeRepository {
  async fetchAll(limit?: number): Promise<Cafe[] | null> {
    const sql = `
      SELECT
        id,
        cafe_name as name,
        cafe_description as description,
        ST_X(cafe_location::geometry) as longitude,
        ST_Y(cafe_location::geometry) as latitude
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
        ST_X(cafe_location:geometry) as longitude,
        ST_Y(cafe_location:geometry) as latitude
      FROM cafes where cafe_name like concat('%', $1::text, '%')
      `;
    const res = formattedSubstr
      ? await query(sql, [formattedSubstr]).then(
          (response: QueryResult) => response.rows,
        )
      : null;

    return res;
  }

  async addCafe(cafe: NewCafe): Promise<string> {
    try {
      const formattedName = cafe.name.toLowerCase();
      const sql = `
        insert into cafes(cafe_name, cafe_description, cafe_location)
        values($1, $2, ST_PointFromText('POINT(' || $3::text || ' ' || $4::text || ')', 4326))
        `;
      await query(sql, [
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

  async deleteCafe(cafeId: number): Promise<string> {
    try {
      const sql = `
        delete from cafes
        where id = $1
        `;
      await query(sql, [cafeId]);
      return "Successfully deleted cafe";
    } catch (error) {
      throw error;
    }
  }

  async updateCafe(cafeId: number, cafe: NewCafe): Promise<string> {
    try {
      const formattedName = cafe.name.toLowerCase();
      const sql = `
        update cafes
        set cafe_name = $1,
          cafe_description = $2,
          cafe_location = ST_PointFromText('POINT(' || $3::text || ' ' || $4::text || ')', 4326)
        where id = $5
        `;
      await query(sql, [
        formattedName,
        cafe.description,
        cafe.longitude,
        cafe.latitude,
        cafeId,
      ]);
      return "Succesfully updated cafe";
    } catch (error) {
      throw error;
    }
  }
}
