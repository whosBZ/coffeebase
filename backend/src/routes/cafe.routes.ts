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
  CafeDbSchema,
  CreateCafeRequestSchema,
  DeleteCafeRequestSchema,
  UpdateCafeRequestSchema,
} from "../schemas/cafe.schema.js";

export const cafeRouter: Router = Router();

cafeRouter.get("/", getAllCafes);
cafeRouter.get("/search", getCafesBySubstring);
cafeRouter.get("/nearby", getNearbyCafes);
cafeRouter.post("/", validate(CreateCafeRequestSchema), addNewCafe);
cafeRouter.delete("/:id", validate(DeleteCafeRequestSchema), deleteCafe);
cafeRouter.patch("/:id", validate(UpdateCafeRequestSchema), updateCafe);
