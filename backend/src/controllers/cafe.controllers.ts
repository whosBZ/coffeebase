import type { NextFunction, Request, Response } from "express";
import { CafeRepository } from "../repositories/cafe-repository.js";
import { CafeService } from "../services/cafe.service.js";
import type {
  CreateCafeRequestInput,
  DeleteCafeRequestInput,
} from "../schemas/cafe.schema.js";

const cafeRepo = new CafeRepository();
const cafeService = new CafeService(cafeRepo);

export const getNearbyCafes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cafes = await cafeService.fetchCafesByLocation(1, 2);
    res.status(200).json({ status: "success", data: cafes });
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

export const getCafesBySubstring = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.query.cafeSubstr) {
      const cafes = await cafeService.searchCafesByName(
        String(req.query.cafeSubstr),
      );
      res.status(200).json({ status: "success", data: cafes });
    } else {
      res.status(400).json({
        status: "fail",
        message: "Missing required query paramanter: cafeSubtr",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const addNewCafe = async (
  req: CreateCafeRequestInput,
  res: Response,
  next: NextFunction,
) => {
  try {
    await cafeService.insertNewCafe(req.body);
    res.status(200).json({
      status: "sucess",
      message: "Cafe added to database",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCafe = async (
  req: DeleteCafeRequestInput,
  res: Response,
  next: NextFunction,
) => {
  try {
    await cafeService.deleteCafe(req.query.id);
    res.status(200).json({
      status: "sucess",
      message: "Cafe deleted from database",
    });
  } catch (error) {
    next(error);
  }
};

export const updateCafe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.body.id) {
      const result = await cafeService.updateCafe(req.body);
      res.status(200).json({
        status: "success",
        message: result,
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "No or invalid cafe id provided",
      });
    }
  } catch (error) {
    next(error);
  }
};
