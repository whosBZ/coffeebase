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
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.body) {
      let cafeServiceValid = cafeService.validateCafeBody(req.body);
      if (!cafeServiceValid) {
        // const result = await cafeService.insertNewCafe(req.body);
        res.status(200).json({
          status: "sucess",
          message: "Cafe added to database",
        });
      } else {
        res.status(400).json({
          status: "fail",
          message: cafeServiceValid,
        });
      }
    } else {
      res.status(400).json({
        status: "fail",
        message: "No body supplied",
      });
    }
  } catch (error) {
    next(error);
  }
};
