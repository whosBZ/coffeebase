import { Router } from "express";
import {
  getAllCafes,
  getCafesBySubstring,
  getNearbyCafes,
  addNewCafe,
  deleteCafe,
} from "../controllers/cafe.controllers.js";

export const cafeRouter = Router();

cafeRouter.get("/", getAllCafes);
cafeRouter.get("/search", getCafesBySubstring);
cafeRouter.get("/nearby", getNearbyCafes);
cafeRouter.post("/addCafe", addNewCafe);
cafeRouter.delete("/deleteCafe", deleteCafe);
