import { CafeRepository } from "../repositories/cafe-repository.js";
import type { Cafe } from "../types/cafe.js";
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
      const result = await this.cafeRepo.fetchAll(limit);
      return result;
    } catch (error) {
      console.log("Database query error:", error);
      throw error;
    }
  };

  // Allows searching by substring
  public searchCafesByName = async (cafeSubstr: string) => {
    try {
      const result = await this.cafeRepo.fetchBySubstr(cafeSubstr);
      return result;
    } catch (error) {
      console.log("Database query error:", error);
      throw error;
    }
  };

  public insertNewCafe = async (cafe: Cafe) => {
    try {
      const result = await this.cafeRepo.addCafe(cafe);
      return result;
    } catch (error) {
      console.log();
    }
  };

  public validateCafeBody = (cafe: Cafe) => {
    if (!cafe.name || cafe.name.length < 3) {
      return "Missing or invalid cafe name";
    }
    if (!cafe.description || cafe.description.length < 10) {
      return "Missing or invalid cafe description";
    }
    if (cafe.latitude > 90 || cafe.latitude < -90) {
      return "Invalid latitude";
    }
    if (cafe.longitude > 180 || cafe.longitude < -180) {
      return "Invalid longitude";
    }

    return null;
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
