import { Router } from "express";
import * as categories from "../controllers/apiCategories.controller.js";

const RouterApiCategories = Router();

RouterApiCategories.get("/api/categories", categories.GetCategories);
RouterApiCategories.get("/api/categories/:id", categories.GetCategorie);
RouterApiCategories.post("/api/categories/", categories.CreateCategorie);
RouterApiCategories.put("/api/categories/:id", categories.UpdateCategorie);
RouterApiCategories.delete("/api/categories/:id", categories.DeleteCategorie);

export default RouterApiCategories;
