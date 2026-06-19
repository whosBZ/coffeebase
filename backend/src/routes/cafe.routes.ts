import { Router } from "express";
import {
  getAllCafes,
  getCafesBySubstring,
  getNearbyCafes,
  addNewCafe,
  deleteCafe,
  updateCafe,
} from "../controllers/cafe.controllers.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  CreateCafeRequestSchema,
  DeleteCafeRequestSchema,
} from "../schemas/cafe.schema.js";

export const cafeRouter = Router();

cafeRouter.get("/", getAllCafes);
cafeRouter.get("/search", getCafesBySubstring);
cafeRouter.get("/nearby", getNearbyCafes);
cafeRouter.post("/addCafe", validate(CreateCafeRequestSchema), addNewCafe);
cafeRouter.delete("/deleteCafe", validate(DeleteCafeRequestSchema), deleteCafe);
cafeRouter.patch("/updateCafe", updateCafe);
