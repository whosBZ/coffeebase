import type { QueryResult } from "pg";
import { CafeRepository } from "../repositories/cafe-repository.js";
const cafes = ["Insomnia", "Cafe Nero", "Wall & Keogh", "Brewlabs"];

export class CafeService {
  private cafeRepo: CafeRepository;

  constructor(cafeRepo: CafeRepository) {
    this.cafeRepo = cafeRepo;
  }

  // Should fetch within a certain radius of the given one
  // Means you need to calculate the cafes that will appear in that radius
  public fetchCafesByLocation = async (latitude: number, longitude: number) => {
    return ["Nero", "Plato"];
  };

  // Allow for an optional limit to be given
  // Needs to ensure you understand pagination
  public fetchAllCafes = async (limit?: number) => {
    try {
      const result = await this.cafeRepo.fetchAllCafes(limit);
      return result;
    } catch (error) {
      console.log("Database query error:", error);
      throw error;
    }
  };

  public fetchCafesWithBeansByBrand = async (beanBrand: string) => {
    console.log("Cafe with beans by brand");
    return [
      "Cafe with beans by brand #1",
      "Cafe with beans by name #2",
      "Cafe with beans by name #3",
    ];
  };

  public fetchCafesWithBeansByName = async (beanName: string) => {
    console.log("Cafe with beans by name");
    return [
      "Cafe with beans by name #1",
      "Cafe with beans by name #2",
      "Cafe with beans by name #3",
    ];
  };
}
