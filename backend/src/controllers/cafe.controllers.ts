import type { NextFunction, Request, Response } from "express";
import { CafeRepository } from "../repositories/cafe-repository.js";
import { CafeService } from "../services/cafe.service.js";

const cafeRepo = new CafeRepository();
const cafeService = new CafeService(cafeRepo);

export const getNearbyCafes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cafes = await cafeService.fetchCafesByLocation(1, 2);
    res.status(200).json({ status: "sucess", data: cafes });
  } catch (error) {
    next(error);
  }
};

export const getAllCafes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log(JSON.stringify(req.query));
    const cafes = await cafeService.fetchAllCafes(Number(req.query.limit));
    res.status(200).json({ status: "success", data: cafes });
  } catch (error) {
    next(error);
  }
};
