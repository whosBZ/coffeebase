import { Router } from "express";
import {
  getAllCafes,
  getNearbyCafes,
} from "../controllers/cafe.controllers.js";

export const cafeRouter = Router();

cafeRouter.get("/{:limit}", getAllCafes);
cafeRouter.get("/nearby", getNearbyCafes);
