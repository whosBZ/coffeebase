import { CafeRepository } from "../repositories/cafe-repository.js";
import type { Cafe } from "../types/cafe.js";

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
    let cafeBodyInvalid = this.validateCafeBody(cafe);
    if (!cafeBodyInvalid) await this.cafeRepo.addCafe(cafe);
    else throw Error(cafeBodyInvalid);
  };

  public deleteCafe = async (cafeId: string) => {
    const validCafeId = this.validateCafeId(cafeId);
    const result = await this.cafeRepo.deleteCafe(validCafeId);
    return result;
  };

  public updateCafe = async (cafe: Cafe) => {
    this.validateCafeBody(cafe);
    const validCafeId = this.validateCafeId(cafe.id);
    const validatedCafe: Cafe = {
      ...cafe,
      id: validCafeId,
    };
    await this.cafeRepo.updateCafe(validatedCafe);
  };

  private validateCafeId = (cafeId: string | number): number => {
    const validatedCafeId = Number(cafeId);
    if (isNaN(validatedCafeId)) throw Error("Invalid Cafe ID provided");
    else return validatedCafeId;
  };

  private validateCafeBody = (cafe: Cafe) => {
    if (!cafe.name || cafe.name.length < 3) {
      throw Error("Missing or invalid cafe name");
    }
    if (!cafe.description || cafe.description.length < 10) {
      throw Error("Missing or invalid cafe description");
    }
    if (!cafe.latitude || cafe.latitude > 90 || cafe.latitude < -90) {
      throw Error("Missing or invalid cafe latitude");
    }
    if (!cafe.longitude || cafe.longitude > 180 || cafe.longitude < -180) {
      throw Error("Missing or invalid cafe longitude");
    }

    return null;
  };
}
