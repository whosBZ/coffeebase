import type { NextFunction, Request, Response } from "express";
import {
  fetchAllCafes,
  fetchCafesByLocation,
} from "../services/cafe.service.js";

export const getNearbyCafes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cafes = await fetchCafesByLocation(1, 2);
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
    const cafes = await fetchAllCafes(Number(req.params.limit));
    res.status(200).json({ status: "success", data: cafes });
  } catch (error) {
    next(error);
  }
};
