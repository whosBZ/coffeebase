import type { QueryResult } from "pg";
import { query } from "../config/db.js";
const cafes = ["Insomnia", "Cafe Nero", "Wall & Keogh", "Brewlabs"];

// Should fetch within a certain radius of the given one
// Means you need to calculate the cafes that will appear in that radius
export const fetchCafesByLocation = async (
  latitude: number,
  longitude: number,
) => {
  return ["Nero", "Plato"];
};

// Allow for an optional limit to be given
// Needs to ensure you understand pagination
export const fetchAllCafes = async (limit?: number) => {
  try {
    const sql = `
      SELECT
        cafe_name as name,
        cafe_description as description,
        ST_X(cafe_location) as latitude,
        ST_Y(cafe_location) as longitude
      FROM cafes
      `;

    const result = await query(sql).then((result: QueryResult) => {
      return result.rows;
    });
    return result;
  } catch (error) {
    console.log("Database query error:", error);
    throw error;
  }
};

export const fetchCafesWithBeansByBrand = async (beanBrand: string) => {
  console.log("Cafe with beans by brand");
  return [
    "Cafe with beans by brand #1",
    "Cafe with beans by name #2",
    "Cafe with beans by name #3",
  ];
};

export const fetchCafesWithBeansByName = async (beanName: string) => {
  console.log("Cafe with beans by name");
  return [
    "Cafe with beans by name #1",
    "Cafe with beans by name #2",
    "Cafe with beans by name #3",
  ];
};
