import { Router } from "express";
import * as uploads from "../controllers/apiUploads.controller.js";
import { uploadMiddle } from "../middlewares/multer.js";

const RouterApiUploads = Router();

RouterApiUploads.post(
  "/api/uploads/",
  uploadMiddle.array("file"),
  uploads.CreateUpload
);
RouterApiUploads.get("/api/uploads/", uploads.GetUploads);
RouterApiUploads.get("/api/uploads/:id");
RouterApiUploads.delete("/api/uploads/:id", uploads.DeleteUpload);

export default RouterApiUploads;
